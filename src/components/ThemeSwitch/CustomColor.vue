<template>
  <n-color-picker
    class="w-44"
    :modes="['rgb']"
    :show-preview="true"
    :swatches="[
      '#18A058',
      '#c41d7f',
      '#531dab',
      '#096dd9',
      '#d46b08',
      '#cf1322',
      '#434343',
    ]"
    :actions="['confirm']"
    :value="updateValue"
    @update:show="toggleShow"
    @update:value="handleUpdateValue"
  />
</template>

<script lang="ts">
export default {
  name: "CustomColor",
};
</script>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const currentColor = computed(() => appStore.primaryColor);
const updateValue = ref("");
const handleUpdateValue = (value: string) => {
  updateValue.value = value;
};

onMounted(() => {
  updateValue.value = currentColor.value;
});
const toggleShow = (show: boolean) => {
  if (show) {
    updateValue.value = currentColor.value;
  } else {
    appStore.setPrimaryColor(updateValue.value);
  }
};
</script>
<style scoped></style>
