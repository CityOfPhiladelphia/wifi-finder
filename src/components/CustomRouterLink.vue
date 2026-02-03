<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  {{ t('verizonLink.prefix') }}<router-link :to="{ name: 'home', query: { services: 'internetServices_verizon' }}">{{ t('verizonLink.linkText') }}</router-link>{{ t('verizonLink.suffix') }}
</template>