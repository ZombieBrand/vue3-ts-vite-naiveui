<template>
  <div class="tags-view-container" :class="{ 'dark-mode': darkTheme }">
    <router-link
      v-for="(tag, index) of tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent="openMenu($event, index)"
      :style="{
        backgroundColor: isActive(tag) ? primaryColor : '',
        borderColor: isActive(tag) ? primaryColor : '',
      }"
    >
      <span style="vertical-align: middle">{{ tag.title }}</span>
      <n-icon
        class="el-icon-close"
        v-show="!isActive(tag)"
        size="16"
        @click.prevent.stop="onCloseClick(index)"
      >
        <CloseCircle />
      </n-icon>
    </router-link>
    <ContextMenu
      v-show="visible"
      :index="menuIndex"
      :style="menuStyle"
      v-model:visible="visible"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "TagsView",
};
</script>
<script lang="ts" setup>
import ContextMenu from "@/components/TagsView/ContextMenu.vue";
import { CloseCircle } from "@vicons/ionicons5";
import { useAppStore } from "@/store/modules/app";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { TTagsView } from "@/types/tags";
import { useI18n } from "vue-i18n";
import { t } from "@/locales";
import useAddTagsViewList from "@/hooks/useAddTagsViewList";
const { locale } = useI18n();

onMounted(() => {
  // 观察路由向appStore.tagsViewList添加数据
  useAddTagsViewList();
});

const route = useRoute();
const appStore = useAppStore();

const primaryColor = appStore.primaryColor;
const tagsViewList = computed(() => appStore.tagsViewList);

const isActive = (tag: TTagsView) => {
  return tag.path === route.path;
};

// 观察多语言更新title
watch(locale, () => {
  tagsViewList.value.forEach((tag, index) => {
    const title = tag.meta.title;
    appStore.changeTagsView({
      tag: {
        ...tag,
        title: t(`route.${title}`),
      },
      index,
    });
  });
});

// 鼠标右键
const visible = ref(false);
const menuIndex = ref<number | undefined>(0);
const menuStyle = ref({
  left: "0px",
  top: "0px",
});
const openMenu = (evt: MouseEvent, index: number) => {
  console.log(evt);
  const { x, y } = evt;
  menuStyle.value.left = x + "px";
  menuStyle.value.top = y + "px";
  visible.value = true;
  menuIndex.value = index;
};
const onCloseClick = (index: number) => {
  appStore.removeTagsView({
    type: "index",
    index,
  });
};

const darkTheme = computed(() => appStore.darkTheme);
watch(
  darkTheme,
  (value) => {
    console.log(value, darkTheme);
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 22px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      margin-left: 4px;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  &.dark-mode {
    background: #000000;
    border-bottom: 1px solid #303133;
    .tags-view-item {
      border: 1px solid #303133;
      color: #ffffff;
      background: #000000;
    }
    &.active {
      color: #000000;
      &::before {
        background: #000000;
      }
    }
    .el-icon-close {
      &:hover {
        background-color: #ffffff;
        color: #000000;
      }
    }
  }
}
</style>
