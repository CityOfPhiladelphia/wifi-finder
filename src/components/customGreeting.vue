<script setup>

import $config from '../main.js';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  database: {
    type: Array,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

// computed
const allExceptions = computed(() => {
  console.log('allExceptions computed is running');
  let exceptionsPreliminary = [];
  let exceptionFields = [
    'hours_mon_exceptions',
    'hours_tues_exceptions',
    'hours_wed_exceptions',
    'hours_thurs_exceptions',
    'hours_fri_exceptions',
    'hours_sat_exceptions',
    'hours_sun_exceptions',
  ];
  for (let location of props.database) {
    if (location) {
      // console.log('in loop, location:', location);
      for (let field of exceptionFields) {
        if (location.attributes[field]) {
          exceptionsPreliminary.push(location.attributes[field]);
        }
      }
    }
  }
  let exceptionsSet = new Set(exceptionsPreliminary);
  let exceptionsArray = [ ...exceptionsSet ];

  return exceptionsArray;
});

const allLowCostOptions = computed(() => {
  let notes = [];
  for (let location of props.database) {
    if (location) {
      if (location.attributes.payment_other_low_cost) {
        notes.push(location.attributes.payment_other_low_cost);
      }
    }
  }
  return notes;
});

const allFacebook = computed(() => {
  let notes = [];
  for (let location of props.database) {
    if (location) {
      if (location.attributes.contact_facebook) {
        notes.push(location.attributes.contact_facebook);
      }
    }
  }
  return notes;
});

const allInstagram = computed(() => {
  let notes = [];
  for (let location of props.database) {
    if (location) {
      if (location.attributes.contact_instagram) {
        notes.push(location.attributes.contact_instagram);
      }
    }
  }
  return notes;
});

const allTwitter = computed(() => {
  let notes = [];
  for (let location of props.database) {
    if (location) {
      if (location.attributes.contact_twitter) {
        notes.push(location.attributes.contact_twitter);
      }
    }
  }
  return notes;
});

</script>

<template>
  <div class="main-greeting">
    <div
      id="main-area"
      class="main-area"
    >
      <div class="exclamation-holder columns is-mobile">
        <div class="column is-narrow">
          <font-awesome-icon
            icon="exclamation-triangle"
            class="fa-3x"
          />
        </div>
        <div class="column exclamation-details">
          <div class="exclamation-message">{{ $t('checkSite') }}</div>
        </div>
      </div>

      <h3>
        {{ $t('introPage.section1Title') }}
      </h3>

      <p v-html="$t('introPage.p0')" />

      <br>

      <div class="data-section">
        <p v-html="t('introPage.p2')" />
      </div>

      <div class="data-section">
        <ul class="bullet-list">
          <li
            v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul1"
            :key="index"
          >
            {{ t('introPage.ul1.' + index) }}
          </li>
        </ul>
      </div>

      <div class="has-text-centered container">
        <button
          class="button greeting-button"
          @click="$emit('view-list')"
          v-html="$t('app.viewList')"
        />
        <button
          v-if="isMobile"
          class="button greeting-button"
          @click="$emit('view-map')"
          v-html="$t('app.viewMap')"
        />
      </div>

      <h3>
        {{ $t('introPage.section2Title') }}
      </h3>

      <div>
        <p v-html="$t('introPage.p3')" />
      </div>

      <h3>
        {{ $t('introPage.section3Title') }}
      </h3>
      <div>
        <p v-html="$t('introPage.p4')" />
      </div>

    </div>
  </div>
</template>

<style>

.exclamation-details {
  line-height: 3rem;
}

.exclamation-message {
  height: 100%;
}

.intro-list-item {
  line-height: 1.5rem;
}

.data-section {
  margin-bottom: 1rem;
}

</style>
