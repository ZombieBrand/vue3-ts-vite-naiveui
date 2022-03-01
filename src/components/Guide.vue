<template>
  <n-icon size="28" @click.stop="tour.start()">
    <TrailSignOutline />
  </n-icon>
</template>

<script lang="ts">
export default {
  name: "Guide",
};
</script>
<script setup lang="ts">
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { TrailSignOutline } from "@vicons/ionicons5";
import { onMounted } from "vue";
import { getItem, setItem } from "@/utils/storage";
onMounted(() => {
  const guideStatus = getItem("guide");
  if (guideStatus !== "completed") {
    tour.start();
    setItem("guide", "completed");
  }
});
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: true,
  },
});
tour.addStep({
  text: "这里是菜单",
  attachTo: {
    element: ".guide-sidebar",
    on: "right",
  },
  buttons: [
    {
      text: "下一步",
      action: tour.next,
    },
  ],
});
tour.addStep({
  text: "这里是路由搜索功能,搜索路由导航名称.",
  attachTo: {
    element: ".guide-header-search",
    on: "bottom",
  },
  buttons: [
    {
      text: "下一步",
      action: tour.next,
    },
  ],
});
tour.addStep({
  text: "点击进入全屏显示",
  attachTo: {
    element: ".guide-full-screen",
    on: "bottom",
  },
  buttons: [
    {
      text: "下一步",
      action: tour.next,
    },
  ],
});
tour.addStep({
  text: "用户功能,包含退出登陆",
  attachTo: {
    element: ".guide-avatar",
    on: "bottom-start",
  },
  buttons: [
    {
      text: "下一步",
      action: tour.next,
    },
  ],
});
tour.addStep({
  text: "系统配置功能,包含主题颜色,国际化等",
  attachTo: {
    element: ".guide-settings",
    on: "bottom-start",
  },
  buttons: [
    {
      text: "下一步",
      action: tour.complete,
    },
  ],
});
</script>
<style scoped></style>
