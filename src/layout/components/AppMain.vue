<template>
  <n-layout :embedded="true" content-style="padding: 12px;">
    <Transition name="zoom-fade" mode="out-in">
      <router-view></router-view>
    </Transition>
  </n-layout>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped></style>
