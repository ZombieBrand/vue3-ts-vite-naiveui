import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    name: "超级管理员",
  }),

  persist: true,
});
