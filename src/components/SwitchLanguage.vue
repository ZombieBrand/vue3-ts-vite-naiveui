<template>
  <n-select
    class="w-16"
    v-model:value="currentLanguage"
    :options="localesOptions"
    @update:value="toggleLocales"
  />
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance,nextTick } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const { availableLocales, locale } = useI18n();
const { ctx }:any = getCurrentInstance();
const currentLanguage = ref(locale.value);
const localesOptions = computed(() => {
  return availableLocales.map((item) => ({
    label: item,
    value: item,
  }));
});
const toggleLocales = () => {
  locale.value = currentLanguage.value;
  switchLanguage(locale.value);
  nextTick(()=>{
    ctx.$forceUpdate()
  })
};
const switchLanguage = (lang: string) => {
  const storage = useLocalStorage("language", "en");
  storage.value = lang;
};
</script>

<style scoped></style>
