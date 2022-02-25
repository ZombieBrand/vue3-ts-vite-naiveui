<template>
  <div class="header-search" :class="{ show: isShow }" ref="headerSearch">
    <n-icon
      size="28"
      class="cursor-pointer align-middle"
      @click.stop="onShowClick"
    >
      <Search />
    </n-icon>
    <n-select
      class="header-search-select"
      ref="headerSearchSelectRef"
      :filterable="true"
      v-model:value="searchValue"
      :options="routesOptions"
      @update:value="onChangeSearch"
      :filter="filter"
      :render-label="renderLabel"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "HeaderSearch",
};
</script>
<script lang="ts" setup>
import Fuse from "fuse.js";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";
import { computed, ref, h, VNodeChild, watch } from "vue";
import { Search } from "@vicons/ionicons5";
import type { SelectOption, SelectInst } from "naive-ui";
import useRoutsFormat from "@/hooks/useRoutesFormat";
import { generateRoutes, TResult } from "./fuse-data";
const router = useRouter();
const searchValue = ref("");
const isShow = ref(false);
const routesOptions = computed(() => {
  const { routes } = useRoutsFormat();
  return generateRoutes(routes.value);
});
// 点击search Icon
const onShowClick = () => {
  isShow.value = !isShow.value;
};
// 点击headerSearch之外关闭
const headerSearch = ref(null);
const headerSearchSelectRef = ref<SelectInst | null>(null);
onClickOutside(headerSearch, close);

watch(isShow, (value) => {
  if (value) {
    searchValue.value = "";
    headerSearchSelectRef.value?.focus();
  } else {
    headerSearchSelectRef.value?.blur();
  }
});

// 选中option回掉
const onChangeSearch = (value: string) => {
  router.push(value);
  isShow.value = false;
};
// 模糊搜索
const fuse = new Fuse(routesOptions.value, {
  shouldSort: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  keys: [
    {
      name: "label",
      weight: 0.7,
    },
    {
      name: "value",
      weight: 0.3,
    },
  ],
});

// 过滤器函数
const filter = (pattern: string, option: TResult) => {
  const searchResult: Array<Fuse.FuseResult<TResult>> = fuse.search(pattern);
  return searchResult.some((item) => {
    return item.item.value === option.value;
  });
};
const renderLabel = (option: SelectOption): VNodeChild => {
  let labelText = JSON.parse(JSON.stringify(option.label));
  labelText = Array.isArray(labelText) ? labelText.join(" > ") : labelText;
  return h(
    "div",
    {},
    {
      default: () => labelText,
    }
  );
};
function close() {
  isShow.value = false;
}
</script>
<style lang="scss" scoped>
.header-search {
  vertical-align: middle;
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
