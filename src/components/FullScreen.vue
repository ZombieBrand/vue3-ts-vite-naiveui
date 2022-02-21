<template>
  <n-icon size="28" @click="toggle" class="cursor-pointer">
    <Contract v-if="isFullscreen" />
    <Scan v-else />
  </n-icon>
</template>

<script lang="ts">
export default {
  name: "FullScreen",
};
</script>
<script lang="ts" setup>
import { Scan, Contract } from "@vicons/ionicons5";
import { useFullscreen } from "@vueuse/core";
const app = document.getElementById("app");
const { isFullscreen, toggle } = useFullscreen(app);
</script>
<style scoped></style>
