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
