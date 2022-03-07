import Mock from "mockjs";
import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";

export default [
  {
    url: "/user/feature",
    method: "get",
    response: () => {
      return resultSuccess(
        [
          {
            title: "Vue3",
            percentage: 100,
            content:
              '@cparagraph',
          },
          {
            title: "TypeScript",
            percentage: 100,
            content:
              '@cparagraph',
          },
          {
            title: "权限验证（页面权限、功能权限、动态权限、权限配置）",
            percentage: 100,
            content:
              "全面的后台权限验证系统，实现了 <b>页面权限、功能权限、动态权限、权限配置</b> 等全方位的权限功能",
          },
          {
            title: "功能引导",
            percentage: 100,
            content: "对用户的功能引导",
          },
          {
            title: "可配置 + 收缩侧边栏",
            percentage: 100,
            content:
              "根据路由动态生成的 Menu 菜单，实现真正的 <b>配置 Menu</b>",
          },
          {
            title: "动态面包屑",
            percentage: 100,
            content: "动态生成的面包屑数据",
          },
          {
            title: "Tags View",
            percentage: 100,
            content: "便签快捷导航功能",
          },
          {
            title: "国际化",
            percentage: 100,
            content: "多语言的国际化功能实现",
          },
          {
            title: "动态换肤",
            percentage: 100,
            content: "主题更换功能，提供缓存实现",
          },
          {
            title: "页面搜索",
            percentage: 100,
            content: "根据路由配置自动化生成的页面搜索数据，无需手动配置",
          },
          {
            title: "excel 导出、导入",
            percentage: 100,
            content: "excel 表格的导入、导出实现",
          },
          {
            title: "zip 导入",
            percentage: 100,
            content: "页面数据导出为 zip ",
          },
          {
            title: "富文本 + MarkDown 编辑器",
            percentage: 100,
            content: "常用的编辑器功能，包含 富文本编辑器 && MarkDown 编辑器",
          },
          {
            title: "动态表格 + 拖拽表格 + 内联编辑表格",
            percentage: 100,
            content:
              "表格列表的常见操作，多用于包含表格项的展示功能中。包括：动态表格 && 拖拽表格 && 内联编辑表格 ",
          },
          {
            title: "统一错误处理",
            percentage: 100,
            content:
              "页面级的错误处理由 vue-router 统一处理。包含 401 和 404 的错误处理",
          },
          {
            title: "发布",
            percentage: 100,
            content: "构建与发布",
          },
          {
            title: "其他",
            percentage: 100,
            content:
              "除了以上功能之外，我们还实现了很多其他的功能，比如：CDN、动态的环境变量配置、懒加载、跨域等等",
          },
        ],
        { message: "获取资料成功" }
      );
    },
  },
  {
    url: "/user-manage/detail/:id",
    method: "get",
    response: () =>
      resultSuccess(
        {
          role: [
            {
              id: "1",
              title: "@cname",
            },
          ],
          remark: ["@cname", "@cname"],
          experience: [
            {
              startTime: "1538323200000",
              endTime: "1551369600000",
              title: "@cname",
              desc: "@cparagraph",
            },
            {
              startTime: "1614528000000",
              endTime: "1625068800000",
              title: "@cname",
              desc: "@cparagraph",
            },
          ],
          id: "0",
          openTime: "1433088000000",
          username: "@name",
          title: "@cname",
          mobile: Mock.Random.integer(),
          avatar: "@image",
          gender: "男",
          nationality: "汉",
          address: "@region",
          major: "@cparagraph",
          glory: "@cparagraph",
        },
        { message: "获取员工信息成功" }
      ),
  },
] as MockMethod[];
