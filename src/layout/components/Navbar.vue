<template>
  <div class="flex flex-nowrap items-center justify-between">
    <div class="flex items-center">
      <NavLogo :style="{ width: sideWidth }" />
      <Breadcrumb class="px-4" />
    </div>

    <div class="flex flex-nowrap items-center justify-between space-x-3 px-4">
      <Guide />
      <HeaderSearch class="guide-header-search" />
      <FullScreen class="guide-full-screen" />
      <n-dropdown
        trigger="click"
        @select="selectUserDropDown"
        :options="options"
      >
        <n-avatar :src="userInfo.avatar" class="cursor-pointer guide-avatar" />
      </n-dropdown>
      <n-icon size="28" class="cursor-pointer" @click="activateSetting">
        <settings class="guide-settings" />
      </n-icon>
    </div>
    <n-drawer v-model:show="settingActive" :width="500" placement="right">
      <n-drawer-content title="系统配置" display-directive="show">
        <div class="w-full flex flex-col items-center">
          <n-divider>{{ $t("global.internationalization") }}</n-divider>
          <SwitchLanguage />
          <n-divider>{{ $t("global.darkTheme") }}</n-divider>
          <div class="w-64 flex justify-between items-center">
            <ThemeSwitch />
          </div>
          <n-divider>{{ $t("global.customTheme") }}</n-divider>
          <CustomColor />
        </div>
      </n-drawer-content>
    </n-drawer>
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
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import CustomColor from "@/components/ThemeSwitch/CustomColor.vue";
import FullScreen from "@/components/FullScreen.vue";
import HeaderSearch from "@/components/HeaderSearch/index.vue";
import Guide from "@/components/Guide.vue";
import { computed, ref, watch } from "vue";
import exportScss from "@/styles/export.module.scss";
import { useAppStore } from "@/store/modules/app";
import { usePreferredDark } from "@vueuse/core";
const sideWidth = computed(() => exportScss["sideWidth"]);
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const options = [
  {
    label: "退出登陆",
    key: "loginOut",
  },
];
const selectUserDropDown = (key: string | number) => {
  switch (key) {
    case "loginOut":
      userStore.loginOut();
      break;
  }
};
const settingActive = ref(false);
const activateSetting = () => {
  settingActive.value = true;
};

// 监控系统主题判断是否开启跟随主题功能设置主题样式
const appStore = useAppStore();
const isDark = usePreferredDark();
watch(isDark, (value) => {
  appStore.judgeAutoDark(value);
});
</script>
