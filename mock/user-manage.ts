import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";
import Mock from "mockjs";

export default [
  {
    url: "/api/user-manage/list",
    method: "get",
    response: () => {
      return resultSuccess(
        {
          list: [
            {
              role: [
                {
                  id: "1",
                  title: "超级管理员",
                },
              ],
              _id: "@id",
              id: "0",
              openTime: "1433088000000",
              username: "super-admin",
              mobile: Mock.Random.integer(),
              avatar: "@image",
            },
            {
              role: [
                {
                  id: "2",
                  title: "管理员",
                },
              ],
              _id: "@id",
              id: "1",
              username: "admin",
              openTime: "1559318400000",
              mobile: Mock.Random.integer(),
              avatar: "@image",
            },
          ],
          total: 7,
          page: 1,
          size: 2,
        },
        { message: "获取用户信息成功" }
      );
    },
  },
] as MockMethod[];
