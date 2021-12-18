<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
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
