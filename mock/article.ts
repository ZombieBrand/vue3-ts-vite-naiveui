import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";

export default [
  {
    url: "/api/article/list",
    method: "get",
    statusCode: 200,
    response: ({ query }: Record<string, any>) => {
      const { page, size } = query;
      return resultSuccess(
        {
          list: [
            {
              _id: "612a198d218e733440da07e6",
              ranking: 1,
              title: "ESLint + Git Hooks",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "编码规范",
            },
            {
              _id: "612a198d218e733440da07ec",
              ranking: 2,
              title: "Tags View",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "便签快捷导航功能",
            },
            {
              _id: "612a198d218e733440da07e4",
              ranking: 3,
              title: "Element-Plus",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "基于 Vue 3.0 的桌面端组件库",
            },
            {
              _id: "612a198d218e733440da07ea",
              ranking: 4,
              title: "侧边栏",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "根据路由动态生成的 Menu 菜单",
            },
            {
              _id: "612a198d218e733440da07eb",
              ranking: 5,
              title: "动态面包屑",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "动态生成的面包屑数据",
            },
            {
              _id: "612a198d218e733440da07e8",
              ranking: 6,
              title: "权限验证",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "页面权限、功能权限、动态权限、权限配置",
            },
            {
              _id: "612a198d218e733440da07e5",
              ranking: 7,
              title: "vue-element-admin",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "后台前端解决方案",
            },
            {
              _id: "612a198d218e733440da07e3",
              ranking: 8,
              title: "Vue3 + 全家桶",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "项目基于最新的vue3全家桶进行开发",
            },
            {
              _id: "612a198d218e733440da07e9",
              ranking: 9,
              title: "功能引导",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "对用户的功能引导",
            },
            {
              _id: "612a198d218e733440da07e7",
              ranking: 10,
              title: "架构设计",
              author: "Sunday",
              publicDate: "1629099597000",
              desc: "架构设计",
            },
          ],
          total: 20,
          page: "1",
          size: "10",
        },
        { message: "获取用户信息成功" }
      );
    },
  },
  {
    url: "/api/role/permission/:roleId",
    method: "get",
    statusCode: 200,
    response: () => {
      return resultSuccess(
        ["1", "1-1", "1-2", "1-3", "2", "2-1", "3", "4", "5"],
        { message: "获取角色权限信息成功" }
      );
    },
  },
] as MockMethod[];
