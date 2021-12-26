<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { darkTheme, zhCN, dateZhCN } from "naive-ui";
const { t } =useI18n()
console.log(t)
</script>

<template>
  <n-config-provider
    :theme="darkTheme ? undefined : darkTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
  >
    <router-view />
  </n-config-provider>
</template>

<style></style>
