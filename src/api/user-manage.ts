import request from "@/utils/request";
import type { TExcelData } from "@/types/excel";
/**
 * 获取用户列表数据
 */
export const getUserManageList = (data: any) => {
  return request({
    url: "/user-manage/list",
    method: "get",
    params: data,
  });
};
/**
 * 批量导入
 */
export const userBatchImport = (data: TExcelData) => {
  return request({
    url: "/user-manage/batch/import",
    method: "POST",
    data,
  });
};

/**
 * 获取用户详情
 */
export const getUserDetail = (id: string) => {
  return request({
    url: `/user-manage/detail/${id}`,
  });
};
