<template>
  <n-layout :embedded="true" content-style="padding: 12px;">
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </n-layout>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped></style>
