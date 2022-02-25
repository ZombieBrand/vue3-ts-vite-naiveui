import { defineStore } from "pinia";
import type { TTagsView } from "@/types/tags";

interface TChangeTagsViewArg {
  index: number;
  tag: TTagsView;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    sideMenuCollapse: false,
    primaryColor: "#18A058FF",
    darkTheme: false,
    autoDark: false,
    tagsViewList: [] as TTagsView[],
  }),
  actions: {
    setMenuCollapse(state: boolean) {
      this.sideMenuCollapse = state;
    },
    setPrimaryColor(color: string) {
      this.primaryColor = color;
    },
    setDarkTheme(state: boolean) {
      this.darkTheme = state;
    },
    setAutoDark(state: boolean) {
      this.autoDark = state;
    },
    addTagsViewList(tag: TTagsView) {
      // 去重复
      const isFind = this.tagsViewList.find((item) => {
        return item.path === tag.path;
      });

      !isFind && this.tagsViewList.push(tag);
    },
    changeTagsView({ index, tag }:TChangeTagsViewArg) {
      this.tagsViewList[index] = tag;
    },
  },
  persist: true,
});
