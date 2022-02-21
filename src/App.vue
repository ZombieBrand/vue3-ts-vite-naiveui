<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import AppProvider from "@/components/Application";
import useCustomColor from "@/hooks/use-custom-color";
import { useAppStore } from "@/store/modules/app";
import { darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from "naive-ui";
const appStore = useAppStore();

// 语言包配置
const { locale } = useI18n();
const language = computed(() => {
  return locale.value === "zh" ? zhCN : enUS;
});
const dataLanguage = computed(() => {
  return locale.value === "zh" ? dateZhCN : dateEnUS;
});


// 黑暗主题状态 = boolean
const currentDarkTheme: ComputedRef<boolean> = computed(() => appStore.darkTheme);
// 自定义主题色
const themeOverrides = useCustomColor();
</script>
<script lang="ts">
export default {
  name: "App",
};
</script>
<template>
  <n-config-provider
    :theme="!currentDarkTheme ? undefined : darkTheme"
    :locale="language"
    :date-locale="dataLanguage"
    :theme-overrides="themeOverrides"
    class="w-full h-full"
  >
    <n-global-style />
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<style></style>
