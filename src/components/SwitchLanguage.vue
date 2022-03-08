<template>
  <div class="flex items-center">
    <n-icon size="34">
      <Language />
    </n-icon>
    <n-select
      class="w-18"
      v-model:value="currentLanguage"
      :options="localesOptions"
      @update:value="toggleLocales"
    />
  </div>
</template>

<script setup lang="ts">
import { Language } from "@vicons/ionicons5";
import { computed, ref, inject } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const reload = inject("reload") as Function;
const { availableLocales, locale } = useI18n();
const currentLanguage = ref(locale.value);
const localesOptions = computed(() => {
  return availableLocales.map((item) => ({
    label: item === "zh" ? "中文" : "EN",
    value: item,
  }));
});

const toggleLocales = () => {
  locale.value = currentLanguage.value;
  switchLanguage(locale.value);
  reload();
};
const switchLanguage = (lang: string) => {
  const storage = useLocalStorage("language", "en");
  storage.value = lang;
};
</script>

<style scoped></style>
