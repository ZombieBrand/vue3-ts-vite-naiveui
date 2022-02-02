<template>
  <div class="app-wrapper">
    <!--  左侧菜单 Menu  -->
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!--  顶部 Navbar -->
        <Navbar></Navbar>
      </div>
      <!--  内容 AppMain -->
      <AppMain>

      </AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/layout/components/Navbar.vue";
import Sidebar from "@/layout/components/Sidebar/index.vue";
import AppMain from "@/layout/components/AppMain.vue";
import exportScss from "@/styles/export.module.scss";
import { ref } from "vue";
const menuText = ref(exportScss.menuText);
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
