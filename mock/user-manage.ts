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
          "list|20-100": [
            {
              role: [
                {
                  id: Mock.mock("@guid"),
                  title: "超级管理员",
                },
              ],
              _id: "@id",
              id: Mock.mock("@guid"),
              openTime: Mock.mock("@datetime"),
              username: "super-admin",
              mobile: Mock.mock("@natural"),
              avatar: "@image",
            },
            {
              role: [
                {
                  id: Mock.mock("@guid"),
                  title: "管理员",
                },
              ],
              _id: "@id",
              id: Mock.mock("@guid"),
              username: "@name",
              openTime: Mock.mock("@datetime"),
              mobile: Mock.mock("@natural"),
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
