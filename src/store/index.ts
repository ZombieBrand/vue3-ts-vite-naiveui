import { defineStore } from "pinia";
import { useUserStore } from "./modules/user";
import { t } from "@/locales";
export const useStore = defineStore("main", {
  state: () => ({
    userInfo: () => {
      const userStore = useUserStore();
      return userStore.userInfo;
    },
    i18n: t("route.home"),
  }),
  getters: {
    token: () => {
      const userStore = useUserStore();
      return userStore.token;
    },
    /**
     * @returns true=用户信息存在 false=用户信息不存在
     */
    hasUserInfo: () => {
      const userStore = useUserStore();
      console.log({ userStore });
      return userStore.userInfo.id !== "";
    },
    cssVar: () => {},
  },
  persist: true,
});
