<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import AppProvider from "@/components/Application";
import { darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from "naive-ui";
const { locale } = useI18n();
const language = computed(() => {
  return locale.value === "zh" ? zhCN : enUS;
});
const dataLanguage = computed(() => {
  return locale.value === "zh" ? dateZhCN : dateEnUS;
});
</script>
<script lang="ts">
export default {
  name: "App",
};
</script>
<template>
  <n-config-provider
    :theme="darkTheme ? undefined : darkTheme"
    :locale="language"
    :date-locale="dataLanguage"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<style></style>
