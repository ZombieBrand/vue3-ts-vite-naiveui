<template>
  <div class="flex flex-nowrap items-center justify-between">
    <div class="flex items-center">
      <NavLogo :style="{ width: sideWidth }" />
      <Breadcrumb class="px-4" />
    </div>

    <div class="flex flex-nowrap items-center justify-between space-x-3 px-4">
      <n-dropdown
        trigger="click"
        @select="selectUserDropDown"
        :options="options"
      >
        <n-avatar :src="userInfo.avatar" class="cursor-pointer" />
      </n-dropdown>
      <n-icon size="24" class="cursor-pointer">
        <settings />
      </n-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Navbar",
};
</script>
<script setup lang="ts">
import { Settings } from "@vicons/ionicons5";
import { useUserStore } from "@/store/modules/user";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import NavLogo from "@/layout/components/NavLogo.vue";
import { computed } from "vue";
import exportScss from "@/styles/export.module.scss";
const sideWidth = computed(() => exportScss["sideWidth"]);
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const options = [
  {
    label: "退出登陆",
    key: "loginOut",
  },
];
const selectUserDropDown = (key: string) => {
  switch (key) {
    case "loginOut":
      userStore.loginOut();
      break;
  }
};
</script>
<style scoped></style>
