<template>
  <div v-once @click="goHome" class="flex justify-center items-center cursor-pointer h-full space-x-4">
      <n-image
          :preview-disabled="true"
          class="w-10 align-middle"
          :src="logoImg"
      />
      <span
          class="text-2xl font-sans font-bold"
      >Zombie</span
      >
  </div>
</template>

<script lang="ts">
export default {
  name: "NavLogo",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";
import logoImg from '@/assets/images.jpeg'
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
<style scoped></style>
