import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({
    sideMenuCollapse: false,
    primaryColor: "#18A058FF",
    darkTheme: false,
  }),
  actions: {
    setMenuCollapse(state: boolean) {
      this.sideMenuCollapse = state;
    },
    setPrimaryColor(color: string) {
      this.primaryColor = color;
    },
    setDarkTheme(state:boolean){
      this.darkTheme = state
    }
  },
  persist: true,
});
