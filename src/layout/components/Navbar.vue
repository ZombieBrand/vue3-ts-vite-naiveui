<template>
  <n-space
    align="center"
    justify="space-between"
    :wrap="false"
    class="h-full px-4"
  >
    <NavLogo></NavLogo>
    <n-space align="center" justify="space-between" :wrap="false">
      <n-dropdown
        trigger="click"
        @select="selectUserDropDown"
        :options="options"
      >
        <n-avatar :src="userInfo.avatar" class="mt-3 cursor-pointer" />
      </n-dropdown>
      <n-icon size="24" class="mt-3 cursor-pointer">
        <settings />
      </n-icon>
    </n-space>
  </n-space>
</template>

<script lang="ts">
export default {
  name: "Navbar",
};
</script>
<script setup lang="ts">
import { Settings } from "@vicons/ionicons5";
import { useUserStore } from "@/store/modules/user";
import NavLogo from "@/layout/components/NavLogo.vue";
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
