<template>
  <n-breadcrumb>
    <template v-for="item of breadcrumb">
      <!-- 不可点击 -->
      <n-breadcrumb-item
        v-if="item.meta.breadcrumb === true"
        :key="item.path + 'noClick'"
        class="no-click"
      >
        <span>{{ $t(`route.${item.meta.title}`) }}</span>
      </n-breadcrumb-item>
      <!-- 可点击 -->
      <n-breadcrumb-item v-else :href="'#' + item.path" :key="item.path">
        <span>{{ $t(`route.${item.meta.title}`) }}</span>
      </n-breadcrumb-item>
    </template>
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

<style lang="scss" scoped>
.no-click ::v-deep(.n-breadcrumb-item__link) {
  cursor: default;
}
</style>
