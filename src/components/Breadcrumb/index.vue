<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item of breadcrumb"
      :href="'#' + item.path"
      :key="item.path"
    >
      <!-- 不可点击 -->
      <span>{{ $t(`route.${item.meta.title}`) }}</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type {
  RouteLocationNormalizedLoaded,
  RouteLocationMatched,
} from "vue-router";
//生成数组数据
const breadcrumb = ref<RouteLocationMatched[]>([]);
const getBreadcrumbData = (route: RouteLocationNormalizedLoaded) => {
  // 当前路由的标准化路记录
  breadcrumb.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};
// 监听路由变化
const route = useRoute();
watch(
  route,
  (newVal) => {
    getBreadcrumbData(newVal);
  },
  {
    immediate: true,
  }
);
</script>
<style scoped></style>
