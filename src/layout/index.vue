<template>
  <div class="app-wrapper">
    <n-layout position="absolute">
      <n-layout-header :bordered="true">
        <Navbar :style="{ height: navHeight }" />
      </n-layout-header>
      <n-layout position="absolute" :has-sider="true" :style="{ top: mainTop }">
        <Sidebar class="guide-sidebar"/>
        <AppMain />
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/layout/components/Navbar.vue";
import Sidebar from "@/layout/components/Sidebar/index.vue";
import AppMain from "@/layout/components/AppMain.vue";
import exportScss from "@/styles/export.module.scss";
import { computed } from "vue";

const navHeight = computed(() => exportScss["navHeight"]);
const mainTop = computed(() => exportScss["mainTop"]);
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
