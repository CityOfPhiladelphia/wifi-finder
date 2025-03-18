<script setup>

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import VerticalTable from './VerticalTable.vue';

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

// methods
// const parseAddress = (address) => {
//   const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
//   return formattedAddress;
// };

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

const internetServices = computed(() => {
  let columns = [
    {
      label: 'Service',
      i18nLabel: 'service',
      field: 'service',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'yesNo',
      i18nLabel: 'yesNo',
      field: 'yesNo',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  let rows = [];
  rows.push({
    id: 1,
    service: 'internetServices.verizon',
    value: props.item.properties.VERIZON_INET_FIBER === 'Y',
  });
  rows.push({
    id: 1,
    service: 'internetServices.meraki',
    value: props.item.properties.MERAKI_WIFI === 'Y',
  });
  return { columns, rows };
});

const computerServices = computed(() => {
  let columns = [
    {
      label: 'Service',
      i18nLabel: 'service',
      field: 'service',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'yesNo',
      i18nLabel: 'yesNo',
      field: 'yesNo',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  let rows = [];
  rows.push({
    id: 1,
    service: 'computerServices.computersPublicAccess',
    value: props.item.properties.COMPUTERS_PUBLIC_ACCESS_Y_N === 'Y',
  });
  rows.push({
    id: 1,
    service: 'computerServices.computersAfterschoolCamp',
    value: props.item.properties.COMPUTERS_AFTERSCHOOL_CAMP_Y_N === 'Y',
  });
  rows.push({
    id: 1,
    service: 'computerServices.additionalComputerClasses',
    value: props.item.properties.ADDITIONAL_COMPUTER_CLASSES_Y_N === 'Y',
  });
  rows.push({
    id: 1,
    service: 'computerServices.esports',
    value: props.item.properties.ESPORTS === 'Y',
  });
  return { columns, rows };
});

const otherServices = computed(() => {
  let columns = [
    {
      label: 'Service',
      i18nLabel: 'service',
      field: 'service',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'yesNo',
      i18nLabel: 'yesNo',
      field: 'yesNo',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  let rows = [];
  rows.push({
    id: 1,
    service: 'otherServices.generalAfterschoolCamp',
    value: props.item.properties.GENERAL_AFTERSCHOOL_CAMP === 'Y',
  });
  rows.push({
    id: 1,
    service: 'otherServices.gym',
    value: props.item.properties.GYM === 'Y',
  });
  return { columns, rows };
});

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
          v-if="item.properties.STREET_ADDRESS"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.properties.STREET_ADDRESS }}<br>
            Philadelphia, PA {{ item.properties.ZIP }}<br>
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

      </div>

      <div class="column is-6">

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


        <div class="columns is-mobile">
        </div>

      </div>
    </div>

    <vertical-table :data="
      [
        { label: 'Internet Speed', value: item.properties.CURRENT_INTERNET_SPEED_MBPS },
        { label: 'Total Computers', value: item.properties.TOTAL_COMPUTERS },
      ]"
    />

    <h3>{{ $t('internetServices.category') }}</h3>

    <div class="table-intro">
      <div class="table-intro">
        {{ $t('cards.table0Intro') }}
      </div>
    </div>

    <vue-good-table
        :columns="internetServices.columns"
        :rows="internetServices.rows"
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
            v-if="props.column.label =='yesNo'"
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
          v-if="props.column.field == 'yesNo'"
          class="center"
        >
          <font-awesome-icon
            v-if="props.row.value == true"
            :icon="['far', 'check']"
          />
        </div>
      </template>

      <template #emptystate>
        <div>
          {{ $t('tableNoData.noServices') }}
        </div>
      </template>

    </vue-good-table>


    <h3>{{ $t('computerServices.category') }}</h3>

    <div class="table-intro">
      <div class="table-intro">
        {{ $t('cards.table1Intro') }}
      </div>
    </div>

    <vue-good-table
        :columns="computerServices.columns"
        :rows="computerServices.rows"
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
            v-if="props.column.label =='yesNo'"
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
          v-if="props.column.field == 'yesNo'"
          class="center"
        >
          <font-awesome-icon
            v-if="props.row.value == true"
            :icon="['far', 'check']"
          />
        </div>
      </template>

      <template #emptystate>
        <div>
          {{ $t('tableNoData.noServices') }}
        </div>
      </template>

    </vue-good-table>

    <h3>{{ $t('otherServices.category') }}</h3>

    <div class="table-intro">
      <div class="table-intro">
        {{ $t('cards.table2Intro') }}
      </div>
    </div>

    <vue-good-table
        :columns="otherServices.columns"
        :rows="otherServices.rows"
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
            v-if="props.column.label =='yesNo'"
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
          v-if="props.column.field == 'yesNo'"
          class="center"
        >
          <font-awesome-icon
            v-if="props.row.value == true"
            :icon="['far', 'check']"
          />
        </div>
      </template>

      <template #emptystate>
        <div>
          {{ $t('tableNoData.noServices') }}
        </div>
      </template>

    </vue-good-table>

  </div>
</template>
