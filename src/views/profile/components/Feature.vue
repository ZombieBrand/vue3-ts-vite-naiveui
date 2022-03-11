<template>
  <n-collapse :accordion="true">
    <n-collapse-item
      v-for="(item, index) of features"
      :key="index"
      :title="item.title"
      :name="index"
    >
      <div v-html="item.content"></div>
    </n-collapse-item>
  </n-collapse>
</template>

<script lang="ts">
export default {
  name: "Feature",
};
</script>
<script setup lang="ts">
import type { TFeatures } from "@/types/profile";
defineProps<{
  features: TFeatures[];
}>();
</script>
<style scoped></style>
