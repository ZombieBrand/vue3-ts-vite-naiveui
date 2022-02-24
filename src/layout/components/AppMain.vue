<template>
  <n-layout :embedded="true" content-style="padding: 12px;">
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in">
        <component :is="Component" />
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
import { watch } from "vue";
import { useRoute } from "vue-router";
import { isTags } from "@/utils/tags";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { t } from "@/locales/";
const route = useRoute();
const appStore = useAppStore();

/**
 * 生成title
 */
const getTitle = (route: RouteLocationNormalizedLoaded) => {
  let title = "";
  if (!route.meta) {
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = t(`route.${route.meta.title}`);
  }
  return title;
};
watch(
  route,
  (to, from) => {
    // 处理保存tagView路由
    if (!isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);
</script>
