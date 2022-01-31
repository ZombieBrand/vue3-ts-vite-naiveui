import { defineStore } from "pinia";
import {useUserStore} from './modules/user'
export const useStore = defineStore("main", {
  state: () => ({
    name: "超级管理员",
  }),
  getters:{
    token:()=>{
      const userStore = useUserStore()
      return userStore.token
    }
  },
  persist: true,
});
