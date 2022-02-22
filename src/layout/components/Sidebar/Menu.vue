<template>
  <n-menu
    :value="activeMenu"
    :mode="menuMode"
    :collapsed="collapsed"
    :collapsed-width="menuCollapsedWidth"
    :collapsed-icon-size="menuCollapsedIconSize"
    :options="menuOptions"
    @update:value="clickMenuItem"
  />
</template>

<script lang="ts">
export default {
  name: "Menu",
};
</script>
<script lang="ts" setup>
import exportScss from "@/styles/export.module.scss";
import useRoutsFormat from "@/hooks/use-routes-format";
import { useRouter } from "vue-router";
const router = useRouter();
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const collapsed = computed(() => appStore.sideMenuCollapse);
const route = useRoute();
const menuMode = ref("vertical");
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
// 获取转化后的菜单数据
const menuOptions = useRoutsFormat()
// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push(key);
  }
}
/*----------样式参数Start--------------*/
const menuCollapsedIconSize = computed(() => {
  return menuMode.value !== "horizontal"
    ? parseFloat(exportScss["menuCollapsedIconSize"])
    : "";
});
const menuCollapsedWidth = computed(() => {
  return menuMode.value !== "horizontal"
    ? parseFloat(exportScss["menuCollapsedWidth"])
    : "";
});
/*----------样式参数End----------------*/
</script>
