<template>
  <n-layout-sider
    :show-trigger="true"
    collapse-mode="width"
    :collapsed-width="sideCollapsedWidth"
    :width="sideWidth"
    :native-scrollbar="false"
    :collapsed="collapsed"
    @collapse="toggleCollapse(true)"
    @expand="toggleCollapse(false)"
    :bordered="true"
  >
    <Menu :collapsed="collapsed"></Menu>
  </n-layout-sider>
</template>

<script lang="ts">
export default {
  name: "Sidebar",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import Menu from "./Menu.vue";
import exportScss from "@/styles/export.module.scss";
const appStore = useAppStore();

// 菜单折叠状态
const collapsed = computed(() => appStore.sideMenuCollapse);
const toggleCollapse = (status: boolean) => {
  appStore.setMenuCollapse(status);
};

// 菜单样式
const sideCollapsedWidth = computed(() => {
  return parseFloat(exportScss["sideCollapsedWidth"]);
});
const sideWidth = computed(() => {
  return parseFloat(exportScss["sideWidth"]);
});
</script>

<style lang="scss" scoped></style>
