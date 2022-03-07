import { useRequest } from "vue-request";
import request from "@/utils/request";
import * as T from "@/types/api/user";
export const loginRequest = (data: T.login): Promise<any> => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};
export const getUserInfoRequest = (): Promise<any> => {
  return request({
    url: "/getUserInfo",
    method: "get",
  });
};
export const feature = () => {
  return request({
    url: "/user/feature",
  });
};

export const chapter = () => {
  return request({
    url: "/user/chapter",
  });
};

export const featureRequest = () => useRequest(feature);
export const chapterRequest = () => useRequest(chapter);
