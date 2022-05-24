import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";

export default [
  {
    url: "/api/permission/list",
    method: "get",
    response: () => {
      return resultSuccess(
        [
          {
            id: "1",
            permissionName: "员工管理",
            permissionMark: "userManage",
            permissionDesc: "员工管理菜单",
            children: [
              {
                id: "1-1",
                permissionName: "分配角色",
                permissionMark: "distributeRole",
                permissionDesc: "为员工分配角色",
              },
              {
                id: "1-2",
                permissionName: "导入员工",
                permissionMark: "importUser",
                permissionDesc: "通过 excel 导入员工",
              },
              {
                id: "1-3",
                permissionName: "删除员工",
                permissionMark: "removeUser",
                permissionDesc: "删除员工",
              },
            ],
          },
          {
            id: "2",
            permissionName: "角色列表",
            permissionMark: "roleList",
            permissionDesc: "角色列表菜单",
            children: [
              {
                id: "2-1",
                permissionName: "分配权限",
                permissionMark: "distributePermission",
                permissionDesc: "为角色分配权限",
              },
            ],
          },
          {
            id: "3",
            permissionName: "权限列表",
            permissionMark: "permissionList",
            permissionDesc: "权限列表菜单",
            children: [],
          },
          {
            id: "4",
            permissionName: "文章排名",
            permissionMark: "articleRanking",
            permissionDesc: "文章排名菜单",
            children: [],
          },
          {
            id: "5",
            permissionName: "创建文章",
            permissionMark: "articleCreate",
            permissionDesc: "创建文章页面",
            children: [],
          },
        ],
        { message: "获取权限数据成功!" }
      );
    },
  },
] as MockMethod[];
