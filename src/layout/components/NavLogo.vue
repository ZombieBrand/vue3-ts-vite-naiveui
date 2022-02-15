<template>
  <n-space align="center" justify="space-between" :wrap="false" @click="goHome" class="cursor-pointer h-full w-full">
    <div class="h-full w-full self-center mr-2">
      <n-image
          :preview-disabled="true"
          class="h-10 w-10 self-center"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div>
      <span
          class="text-2xl font-sans font-bold"
      >LogoText</span
      >
    </div>
  </n-space>
</template>

<script lang="ts">
export default {
  name: "NavLogo",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
<style scoped></style>
