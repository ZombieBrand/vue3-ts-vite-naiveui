<template>
  <n-layout :embedded="true" content-style="padding:0 12px 12px 12px;">
    <router-view v-slot="{ Component, route }">
      <TagsView class="absolute top-0 left-0" />
      <transition name="zoom-fade" mode="out-in">
        <keep-alive :exclude="noCache">
          <component
            :is="Component"
            :key="route.path"
            :style="{ marginTop: routerViewTop }"
          />
        </keep-alive>
      </transition>
    </router-view>
  </n-layout>
</template>

<script lang="ts">
export default {
  name: "AppMain",
};
</script>

<script lang="ts" setup>
import TagsView from "@/components/TagsView/TagsView.vue";
import exportScss from "@/styles/export.module.scss";
import useRoutsFormat from "@/hooks/useRoutesFormat";
import type { RouteRecordRaw } from "vue-router";
import { computed } from "vue";
// 获取appMain内容margin信息
const routerViewTop = exportScss["routerViewTop"];
// 获取过滤后的路由信息
const { routes } = useRoutsFormat();
const noCache = computed(() => {
  return findNoCacheRoute(routes.value);
});
function findNoCacheRoute(routes: RouteRecordRaw[]) {
  let arr: string[] = [];
  routes.forEach((item) => {
    if (item.meta && item.meta.noCache && item.name) {
      arr.push(item.name.toString());
    }
    if (item.children && item.children.length > 0) {
      arr = [...arr, ...findNoCacheRoute(item.children)];
    }
  });
  return arr;
}
</script>
