<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) of tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
    ></router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "TagsView",
};
</script>
<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const appStore = useAppStore();
const tagsViewList = computed(() => appStore.tagsViewList);
// TODO:这里tag签名未指定
const isActive = (tag) => {
  return tag.path === route.path;
};
</script>
<style scoped></style>
