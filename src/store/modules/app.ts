import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({
    sideMenuCollapse: false,
  }),
  actions: {
    setMenuCollapse(state: boolean) {
      this.sideMenuCollapse = state;
    },
  },
});
