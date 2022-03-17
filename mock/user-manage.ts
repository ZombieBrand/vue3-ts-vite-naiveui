import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";
import Mock from "mockjs";

export default [
  {
    url: "/api/user-manage/list",
    method: "get",
    statusCode: 200,
    response: ({ query }: Record<string, any>) => {
      const { page, size } = query;
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
          page: +page,
          size: +size,
        },
        { message: "获取用户信息成功" }
      );
    },
  },
  {
    url: "/api/user-manage/batch/import",
    method: "post",
    statusCode: 200,
    response: () => {
      return resultSuccess(
          {},
        { message: "批量上传成功!" }
      );
    },
  },
] as MockMethod[];
