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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const { t } = useI18n();
const collapsed = computed(() => appStore.sideMenuCollapse);
const route = useRoute();
const menuMode = ref("vertical");
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
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
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { generateMenus, filterRouters } from "@/utils/route";
const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateMenus(filterRoutes);
});
// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push(key);
  }
}
// 格式化处理menuOptions
const formatMenuOptions = (route: RouteRecordRaw[]) => {
  return route.map((item) => {
    const routeTemplate = {
      label: item.meta ? t(`route.${item.meta.title}`) : "",
      key: item.path,
      icon: item.meta?.icon,
    };
    if (item.children && item.children.length > 0) {
      // @ts-ignore
      routeTemplate.children = formatMenuOptions(item.children);
    }
    return routeTemplate;
  });
};

const menuOptions = computed(() => {
  return formatMenuOptions(routes.value);
});
</script>
<style scoped></style>
