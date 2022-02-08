import { defineStore } from "pinia";
import { useUserStore } from "./modules/user";
export const useStore = defineStore("main", {
  state: () => ({
  }),
  getters:{
    token:()=>{
      const userStore = useUserStore()
      return userStore.token
    },
    /**
     * @returns true=用户信息存在 false=用户信息不存在
     */
    hasUserInfo:()=>{
      const userStore = useUserStore()
      return JSON.stringify(userStore.userInfo) !== '{}'
    }
  },
  persist: true,
});
