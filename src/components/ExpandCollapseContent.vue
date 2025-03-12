<script setup>

const instance = getCurrentInstance();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { format, parseISO } from 'date-fns';
import { fr, vi, ru, es, enUS, zhCN } from 'date-fns/locale';

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  }
});

// computed
const oldInfoMessage = computed(() => {
  return t('oldInfoMessage');
});

const showTwitter = computed(() => {
  let value = false;
  let badValues = [ 'N/A', 'n/a', 'na', 'NA', 'Na', 'nA', 'none' ];
  if (props.item.properties.contact_twitter && !badValues.includes(props.item.properties.contact_twitter)) {
    value = true;
  }
  return value;
});

const parking = computed(() => {
  let value;
  if (props.item.properties.transit_parking) {
    console.log('parking computed, props.item.properties.transit_parking.split():', props.item.properties.transit_parking.split(','));
    value = props.item.properties.transit_parking.split(',');
  }
  return value;
});

const i18nLocale = computed(() => {
  return instance.appContext.config.globalProperties.$i18n.locale;
});

const paymentOptions = computed(() => {
  let columns = [
    {
      label: 'Service',
      i18nLabel: 'service',
      field: 'service',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'Accepted',
      i18nLabel: 'accepted',
      field: 'value',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  let rows = [
    {
      id: 1,
      service: t('payment.SNAP'),
      value: props.item.properties.payment_snap,
    },
    {
      id: 2,
      service: t('payment.FMNP'),
      value: props.item.properties.payment_fmnp,
    },
    {
      id: 3,
      service: t('payment.foodBucks'),
      value: props.item.properties.payment_philly_food_bucks,
    },
    {
      id: 6,
      service: t('payment.lowCost') + ' ('+ t('seeBelow') + ')',
      value: props.item.properties.payment_other_low_cost != null ? 'Yes' : 'No',
    },
    {
      id: 4,
      service: t('payment.credit'),
      value: props.item.properties.payment_credit,
    },
    {
      id: 5,
      service: t('payment.cash'),
      value: props.item.properties.payment_cash,
    },
  ];
  return { columns, rows };
});

const days = computed(() => {
  let columns = [
    {
      label: 'Days',
      i18nLabel: 'daysOfTheWeek',
      field: 'label',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'Schedule',
      i18nLabel: 'hours',
      field: 'value',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  // let allDays = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ];
  // let allDays = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
  let allDays = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
  let rows = [];

  for (let [ index, day ] of allDays.entries()) {
    console.log('day:', day, 'index:', index, 'hours_'+day+'_start', 'hours_'+day+'_end');
    let scheduleOrClosed = parseTimeRange(day, props.item.properties['hours_'+day+'_start'], props.item.properties['hours_'+day+'_end']);
    // let scheduleOrClosed = parseTimeRange(day, props.item.properties['hours_'+day+'_start'], props.item.properties['hours_'+day+'_end']);
    if (scheduleOrClosed !== 'Closed') {
      rows.push({
        id: index + 1,
        days: daysKey.value[day],
        schedule: scheduleOrClosed,
      });
    }
  }
  return { columns, rows };
});

const daysKey = computed(() => {
  return {
    'mon': 'Monday',
    'tues': 'Tuesday',
    'wed': 'Wednesday',
    'thurs': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday',
    // 'MON': 'Monday',
    // 'TUES': 'Tuesday',
    // 'WED': 'Wednesday',
    // 'THURS': 'Thursday',
    // 'FRI': 'Friday',
    // 'SAT': 'Saturday',
    // 'SUN': 'Sunday',
  };
});

const exceptionsList = computed(() => {
  // let days = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
  let days = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
  let exceptionsArray = [];
  for (let day of days) {
    let dayException = props.item.properties['hours_' + day + '_exceptions'];
    if (dayException) {
      exceptionsArray.push(dayException);
    }
  }
  let exceptionsSet = new Set(exceptionsArray);
  let exceptionsSetArray = [ ...exceptionsSet ];
  return exceptionsSetArray;
});

const exceptionsByDay = computed(() => {
  // let days = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
  let days = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
  let exceptions = {};
  for (let day of days) {
    let dayException = props.item.properties['hours_' + day + '_exceptions'];
    if (dayException) {
      exceptions[day] = dayException;
    }
  }
  return exceptions;
});

const exceptionsWithCounter = computed(() => {
  let exceptionsWithCounter = {};
  for (let day = 0; day < Object.keys(exceptionsByDay.value).length; day++) {
    exceptionsWithCounter[Object.keys(exceptionsByDay.value)[day]] = {
      value: Object.keys(exceptionsByDay.value)[day],
      counter: 1+exceptionsList.value.indexOf(exceptionsByDay.value[Object.keys(exceptionsByDay.value)[day]]),
    };
  }
  console.log('exceptionsWithCounter:', exceptionsWithCounter);
  return exceptionsWithCounter;
});

// methods
const parseException = (exception, index) => {
  let parsedException = '';
  for (let i=0; i<index; i++) {
    parsedException += "*";
  }
  if (t('exceptions') && t('exceptions')[exception]) {
    parsedException += ' ' + t('exceptions')[exception];
  } else {
    parsedException += ' ' + exception;
  }
  return parsedException;
};

const formatDate = (month, day) => {
  // console.log('formatDate is running, month:', month, 'day:', day, 'i18nLocale.value:', i18nLocale.value);
  let monthNumber = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  let dateLocales = {
    'ru': ru,
    'fr': fr,
    'vi': vi,
    'ch': zhCN,
    'es': es,
    'en-US': enUS,
  };
  let value;
  if (month && day) {
    let currentYear = new Date().getFullYear();
    let date = new Date(currentYear, monthNumber[month], day);
    // console.log('formatDate is running, date:', date, 'i18nLocale.value:', i18nLocale.value, 'dateLocales[i18nLocale.value]:', dateLocales[i18nLocale.value]);
    value = format(date, 'LLLL d', { locale: dateLocales[i18nLocale.value] });
  } else if (month && !day) {
    let currentYear = new Date().getFullYear();
    let date = new Date(currentYear, monthNumber[month]);
    // console.log('formatDate is running, date:', date, 'i18nLocale.value:', i18nLocale.value, 'dateLocales[i18nLocale.value]:', dateLocales[i18nLocale.value]);
    value = format(date, 'LLLL', { locale: dateLocales[i18nLocale.value] });
  } else {
    value = 'TBD';
  }
  return value;
};

const parseYearRound = (yearRound) => {
  let value;
  if (yearRound == 'Yes') {
    value = t(yearRound);
  } else {
    value = yearRound;
  }
  return value;
};

const parseTimeRange = (day, rawStartTime, rawEndTime) => {
  let exceptionDays = Object.keys(exceptionsWithCounter.value);
  let exceptionNumber;
  if (exceptionDays.includes(day)) {
    exceptionNumber = exceptionsWithCounter.value[day].counter;
  }
  console.log('parseTimeRange, day:', day, 'exceptionDays:', exceptionDays, 'exceptionNumber:', exceptionNumber, 'rawStartTime:', rawStartTime, 'rawEndTime:', rawEndTime);
  let startTime, endTime, value;
  if (rawStartTime === '9:00') {
    rawStartTime = '09:00';
  }
  if (rawStartTime) {
    startTime = format(parseISO('2022-05-24T' + rawStartTime), 'h:mm aaaa');
  }
  console.log('startTime:', startTime);
  if (rawEndTime) {
    endTime = format(parseISO('2022-05-24T' + rawEndTime), 'h:mm aaaa');
  }
  console.log('endTime:', endTime);
  if (startTime && endTime) {
    value = startTime + ' - ' + endTime;
  } else {
    value = 'Closed';
  }
  if (value && exceptionNumber) {
    for (let i=0; i<exceptionNumber; i++) {
      value += "*";
    }
  }
  return value;
};

const parseAddress = (address) => {
  const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
  return formattedAddress;
};

const makeValidUrl = (url) => {
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl
    .trim()
    .replace(/\s/g, '');
  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }
  return newUrl;
};

const makeFacebookUrl = (url) => {
  let value = makeFacebookHandle(url);
  return 'https://www.facebook.com/' + value;
};

const makeFacebookHandle = (url) => {
  let value;
  if (url.includes('facebook.com')) {
    let urlSplit = url.split('/');
    let facebookIndex;
    if (urlSplit.indexOf('facebook.com') !== -1) {
      facebookIndex = urlSplit.indexOf('facebook.com');
    } else if (urlSplit.indexOf('www.facebook.com') !== -1) {
      facebookIndex = urlSplit.indexOf('www.facebook.com');
    }
    // console.log('makeFacebookHandle is running, urlSplit:', urlSplit, 'facebookIndex:', facebookIndex);
    if (facebookIndex >= 0) {
      value = urlSplit[facebookIndex+1];
    }
  } else if (url.includes('@')) {
    value = url.replace('@', '');
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

const makeInstagramUrl = (url) => {
  let value = makeInstagramHandle(url);
  let fixedValue = value.replace('@', '');
  return 'https://www.instagram.com/' + fixedValue;
};

const makeInstagramHandle = (url) => {
  let value;
  if (url.includes('instagram.com')) {
    let urlSplit = url.split('/');
    let instagramIndex;
    if (urlSplit.indexOf('instagram.com') !== -1) {
      instagramIndex = urlSplit.indexOf('instagram.com');
    } else if (urlSplit.indexOf('www.instagram.com') !== -1) {
      instagramIndex = urlSplit.indexOf('www.instagram.com');
    }
    if (instagramIndex >= 0) {
      value = urlSplit[instagramIndex+1];
    }
    // console.log('makeinstagramHandle is running, urlSplit:', urlSplit, 'instagramIndex:', instagramIndex, 'value:', value);
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

const makeTwitterUrl = (url) => {
  let value = makeTwitterHandle(url);
  let fixedValue = value.replace('@', '');
  return 'https://www.twitter.com/' + fixedValue;
};

const makeTwitterHandle = (url) => {
  let value;
  if (url.includes('twitter.com')) {
    let urlSplit = url.split('/');
    let twitterIndex;
    if (urlSplit.indexOf('twitter.com') !== -1) {
      twitterIndex = urlSplit.indexOf('twitter.com');
    } else if (urlSplit.indexOf('www.twitter.com') !== -1) {
      twitterIndex = urlSplit.indexOf('www.twitter.com');
    }
    if (twitterIndex >= 0) {
      value = urlSplit[twitterIndex+1];
    }
    // console.log('maketwitterHandle is running, urlSplit:', urlSplit, 'twitterIndex:', twitterIndex, 'value:', value);
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

// const parseServiceList = (list) => {
//   const formattedService = list;
//   return formattedService;
// };

// const parseTagsList = (list) => {
//   const formattedTags = list.toLowerCase();
//   // console.log('parseTagsList is running, list:', list, 'formattedTags:', formattedTags);
//   // const formattedTags = list.slice().sort().join(", ");
//   return formattedTags;
// };

const parkingValueWithComma = (option, index) => {
  let parkingList = props.item.properties.transit_parking.split(',');
  // console.log('parkingValueWithComma is running, option:', option, 'index:', index, 'parkingList:', parkingList);
  if (index !== parkingList.length-1) {
    // console.log('parkinValueWithComma in if');
    return t(`transit.car.${option.trim()}`) + ', ';
  }
  return t(`transit.car.${option.trim()}`);
};

const trainValueWithComma = (option, index) => {
  let trainList = props.item.properties.transit_regional_rail.split(',');
  // console.log('in trainValueWithComma, trainList:', trainList, 'option:', option);
  if (index !== trainList.length-1) {
    return t(`transit.regRail.${option.trim()}`) + ', ';
  }
  return t(`transit.regRail.${option.trim()}`);
};

const subwayValueWithComma = (option, index) => {
  // console.log('subwayValueWithComma is running, option:', option, 'index:', index);
  let subwayList = props.item.properties.transit_subway;
  if (index !== subwayList.length-1) {
    return t(`transit.subway.${option.trim()}`) + ', ';
  }
  return t(`transit.subway.${option.trim()}`);
};

</script>

<template>
  <div class="main-ec-content">
    <print-share-section
      :item="item"
    />
    <callout
      v-if="item.properties.editdate && item.properties.editdate < 1711929600000"
      class="is-info"
    >
      {{ oldInfoMessage }}
    </callout>
    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.properties.address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.properties.address }}<br>
            Philadelphia, PA {{ item.properties.zip_code }}<br>
          </div>
        </div>

        <div
          v-if="item.properties.PHONE_NUMBER"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            {{ item.properties.PHONE_NUMBER }}
          </div>
        </div>

        <div
          v-if="item.properties.EMAIL"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="envelope" />
          </div>
          <div class="column is-11">
            <a :href="`mailto:${item.properties.EMAIL}`">{{ item.properties.EMAIL }}</a>
          </div>
        </div>

        <div
          v-if="item.properties.URL"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeValidUrl(item.properties.URL_LINK)"
            >
              {{ item.properties.URL }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.properties.contact_facebook"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeFacebookUrl(item.properties.contact_facebook)"
            >
              {{ makeFacebookHandle(item.properties.contact_facebook) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div
          v-if="item.properties.contact_instagram"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeInstagramUrl(item.properties.contact_instagram)"
            >
              {{ makeInstagramHandle(item.properties.contact_instagram) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="showTwitter"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeTwitterUrl(item.properties.contact_twitter)"
            >
              {{ makeTwitterHandle(item.properties.contact_twitter) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div class="columns is-mobile">
          <!-- <div
            class="column is-1"
          >
            <font-awesome-icon icon="car-bus" />
          </div>
          <div class="column">
            <div v-if="item.properties.transit_bus">
              <b>{{ $t('transit.bus') + ': ' }}</b>
              {{ item.properties.transit_bus }}
            </div>
            <div v-if="item.properties.transit_subway && Array.isArray(item.properties.transit_subway)">
              <b>{{ $t('transit.subway.label') + ': ' }}</b>
              <span
                v-for="(option, index) of item.properties.transit_subway"
                v-if="item.properties.transit_subway && Array.isArray(item.properties.transit_subway)"
                :key="index"
              >
                {{ subwayValueWithComma(option, index) }}
              </span>
            </div>
            <div v-if="item.properties.transit_regional_rail">
              <b>{{ $t('transit.regRail.label') + ': ' }}</b>
              <span
                v-for="(option, index) of item.properties.transit_regional_rail.split(',')"
                :key="index"
              >
                {{ trainValueWithComma(option, index) }}
              </span>
            </div>
            <div v-if="item.properties.transit_trolley">
              <b>{{ $t('transit.trolley') + ': ' }}</b>
              {{ item.properties.transit_trolley }}
            </div>
            <div v-if="parking">
              <b>{{ $t('transit.car.label') + ': ' }}</b>
              <span
                v-for="(option, index) of parking"
                :key="index"
              >
                {{ parkingValueWithComma(option, index) }}
              </span>
            </div>
            <div v-if="!item.properties.transit_parking && !item.properties.transit_trolley && !item.properties.transit_regional_rail && !item.properties.transit_subway && !item.properties.transit_bus">
              <span>
                {{ $t('noInfo') }}
              </span>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    {{ item.properties.PROGRAM_TYPE }}

    <!-- <div v-if="item.properties.operator">
      <h3 class="section-heading">
        {{ $t('operator') }}
      </h3>
      <div>{{ item.properties.operator }}</div>
    </div> -->

    <!-- <h3 class="section-heading">
      {{ $t('hours') }}
    </h3> -->
    <!-- <vue-good-table
      :columns="days.columns"
      :rows="days.rows"
      :sort-options="{ enabled: false }"
      style-class="table"
    >
      <template #table-column="props">
        <span
          v-if="props.column.label =='Days'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <span
          v-if="props.column.label =='Schedule'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
      </template>

      <template #table-row="props">
        <span
          v-if="props.column.field == 'label'"
          class="table-text"
        >
          {{ $t(props.row.days) }}
        </span>
        <div
          v-if="props.column.field == 'value'"
          class="table-text"
        >
          {{ props.row.schedule }}
        </div>
      </template>
    </vue-good-table> -->

    <!-- <div class="exceptions-holder">
      <div
        v-for="(exception, index) of exceptionsList"
        :key="index"
      >
        {{ parseException(exception, index+1) }}
      </div>
    </div> -->

    <!-- <h3 class="section-heading">
      {{ $t('paymentOptions') }}
    </h3> -->

    <!-- <vue-good-table
      :columns="paymentOptions.columns"
      :rows="paymentOptions.rows"
      :sort-options="{ enabled: false }"
      style-class="table"
    >
      <template #table-column="props">
        <span
          v-if="props.column.label =='Service'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <div
          v-if="props.column.label =='Accepted'"
          class="center table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </div>
      </template>

      <template #table-row="props">
        <span
          v-if="props.column.field == 'service'"
          class="table-text"
        >
          {{ $t(props.row.service) }}
        </span>
        <div
          v-if="props.column.field == 'value'"
          class="center"
        >
          <font-awesome-icon
            v-if="props.row.value == 'Yes'"
            :icon="['far', 'check']"
          />
        </div>
      </template>
    </vue-good-table> -->

    <!-- <div
      v-if="item.properties.payment_low_cost == 'Yes'"
      class="pt-4"
    >
      {{ t(payment.lowCost) }}: {{ t(otherLowCost[item.properties.payment_other_low_cost]) }}
    </div> -->
  </div>
</template>
