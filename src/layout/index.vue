<template>
  <div>
    <span>layout</span>
    <n-button @click="test">Default</n-button>
  </div>
</template>

<script lang="ts">
import { removeAllItem } from "@/utils/storage";
export default {
  name: "Layout",
  methods: {
    test() {
      removeAllItem();
    },
  },
};
</script>

<style scoped></style>
