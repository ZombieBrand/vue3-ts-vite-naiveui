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
/**
 * 更新角色权限
 */
export const updateRolePermission = ({
  roleId,
  permissionId,
}: {
  roleId: string;
  permissionId: string[];
}) => {
  return request({
    url: "/permission/role/update",
    method: "post",
    data: {
      roleId,
      permissionId,
    },
  });
};
