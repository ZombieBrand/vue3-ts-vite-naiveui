import request from "@/utils/request";
/**
 * 获取角色
 */
export const roleList = () => {
  return request({
    url: "/role/list",
    method: "get",
  });
};

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId: string) => {
  return request({
    url: `/role/permission/${roleId}`,
    method: "get",
  });
};
