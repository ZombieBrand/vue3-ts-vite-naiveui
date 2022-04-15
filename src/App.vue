<script setup lang="ts">
import { ref, computed, provide, nextTick, watch } from "vue";
import type { ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import AppProvider from "@/components/Application";
import useCustomColor from "@/hooks/useCustomColor";
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
const currentDarkTheme: ComputedRef<boolean> = computed(
  () => appStore.darkTheme
);
// 自定义主题色
const themeOverrides = useCustomColor();

const isReloadAlive = ref(true);
const reload = () => {
  isReloadAlive.value = false;
  nextTick(() => {
    isReloadAlive.value = true;
  });
};
provide("reload", reload);
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
    <AppProvider v-if="isReloadAlive">
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>
