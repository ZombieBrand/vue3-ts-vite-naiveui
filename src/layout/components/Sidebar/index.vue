<template>
  <n-layout-sider
    :show-trigger="true"
    collapse-mode="width"
    :collapsed-width="sideCollapsedWidth"
    :width="sideWidth"
    :native-scrollbar="false"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
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
import { computed, ref} from "vue";
import Menu from './Menu.vue'
import exportScss from "@/styles/export.module.scss";
const collapsed = ref(false)
const sideCollapsedWidth = computed(() => {
  return parseFloat(exportScss["sideCollapsedWidth"]);
});
const sideWidth = computed(() => {
  return parseFloat(exportScss["sideWidth"]);
});
</script>

<style lang="scss" scoped></style>
