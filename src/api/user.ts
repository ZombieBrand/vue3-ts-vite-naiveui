import request from "@/utils/request";
import { useRequest } from "vue-request";
import * as T from "@/types/api/user";
const submitLogin = (data: T.login): Promise<any> => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};
const getUserInfo = (data: any): Promise<any> => {
  return request({
    url: "/getUserInfo",
    method: "post",
    data,
  });
};

export const loginRequest = useRequest(submitLogin);
export const getUserInfoRequest = useRequest(getUserInfo);
