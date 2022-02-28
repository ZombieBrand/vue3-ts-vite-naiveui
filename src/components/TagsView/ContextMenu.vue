<template>
  <ul class="context-menu-container" ref="contextMenu">
    <li @click="onRefreshClick">{{ $t("global.refresh") }}</li>
    <li @click="onCloseRightClick">
      {{ $t("components.tagsView.closeRight") }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t("components.tagsView.closeOther") }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "ContextMenu",
};
</script>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { defineEmits, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const appStore = useAppStore();
const props = defineProps({
  index: {
    type: Number,
    required: true,
    default: null,
  },
});
const emit = defineEmits(["update:visible"]);
const router = useRouter();
// 刷新
const onRefreshClick = () => {
  router.go(0);
  close();
};
// 关闭右侧
const onCloseRightClick = () => {
  appStore.removeTagsView({
    type: "right",
    index: props.index,
  });
  close();
};
// 关闭其他
const onCloseOtherClick = () => {
  appStore.removeTagsView({
    type: "other",
    index: props.index,
  });
  close();
};
// 点击外侧关闭菜单
const contextMenu = ref(null);
onClickOutside(contextMenu, close);
function close() {
  emit("update:visible", false);
}
</script>
<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
