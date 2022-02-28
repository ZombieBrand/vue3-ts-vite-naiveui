import { defineStore } from "pinia";
import type { TTagsView, removePayload } from "@/types/tags";

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
    // 根据点击路由添加到tagsView
    addTagsViewList(tag: TTagsView) {
      // 去重复
      const isFind = this.tagsViewList.find((item) => {
        return item.path === tag.path;
      });

      !isFind && this.tagsViewList.push(tag);
    },
    // 改变路由信息
    changeTagsView({ index, tag }: TChangeTagsViewArg) {
      this.tagsViewList[index] = tag;
    },
    // 删除当前选中tagsView标签
    removeTagsView(payload: removePayload) {
      const index = payload.index;
      const tagsViewListTotal = this.tagsViewList.length;
      switch (payload.type) {
        case "index":
          this.tagsViewList.splice(index, 1);
          break;
        case "other":
          this.tagsViewList.splice(index + 1, tagsViewListTotal - 1);
          this.tagsViewList.splice(0,index);
          break;
        case "right":
          this.tagsViewList.splice(index + 1, tagsViewListTotal - 1);
          break;
      }
    },
  },
  persist: true,
});
