<template>
  <n-button @click="changeColor">Default</n-button>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const changeColor = () => {
  appStore.setPrimaryColor("#a416cf");
};
</script>

<style lang="scss" scoped></style>
