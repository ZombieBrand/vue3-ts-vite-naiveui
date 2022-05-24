import request from "@/utils/request";
/**
 * 获取权限数据
 */
export const permissionList = () => {
  return request({
    url: "/permission/list",
    method: "get",
  });
};
