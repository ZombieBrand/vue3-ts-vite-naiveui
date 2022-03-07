<template>
  <div>
    <PanThumb
      :image="useStore.userInfo.avatar"
      :height="'100px'"
      :width="'100px'"
      :hoverable="false"
    >
      <div>Hello</div>
      {{ useStore.userInfo.title }}
    </PanThumb>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProjectCard",
};
</script>
<script setup lang="ts">
import PanThumb from "@/components/PanThumb/index.vue";
import { useUserStore } from "@/store/modules/user";
const useStore = useUserStore();
</script>
<style scoped></style>
