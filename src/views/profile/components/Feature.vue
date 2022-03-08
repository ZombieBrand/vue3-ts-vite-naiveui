<template>
  <n-collapse :accordion="true">
    <n-collapse-item v-for="item of features" :key="item.id" :title="item.title" :name="item.id" >
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
defineProps({
  features: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped></style>
