import request from "@/utils/request";
import type { TPagination } from "@/types/pagination";
import { TLicense } from "@/types/license";
export const getLicenseData = ({ page, size }: TPagination) => {
  return request({
    url: "/licenses",
    method: "get",
    params: {
      limit: size,
      offset: page,
    },
  });
};

export const removeLicense = (id: string) => {
  return request({
    url: `/licenses/${id}`,
    method: "delete",
  });
};

export const updateLicense = (id: string, data: TLicense) => {
  return request({
    url: `/licenses/${id}`,
    method: "patch",
    data,
  });
};

export const downloadLicense = (id: string) => {
  return request({
    url: `/licenses/download/${id}`,
    method: "get",
  });
};
