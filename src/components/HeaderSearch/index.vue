<template>
  <div class="header-search" :class="{ show: isShow }">
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
      :remote="true"
      v-model:value="search"
      :options="options"
      @update:value="onChangeSearch"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "HeaderSearch",
};
</script>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { Search } from "@vicons/ionicons5";
import useRoutsFormat from "@/hooks/use-routes-format";
const isShow = ref(false);
const search = ref("");
const options = computed(() => {
  const routes = useRoutsFormat();
  return routes.value.map((item) => {
    return {
      ...(item.children && { type: "group" }),
      ...item,
    };
  });
});

// 点击search Icon
const onShowClick = () => {
  isShow.value = !isShow.value;
};
// 选中option回掉
const onChangeSearch = () => {};
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
