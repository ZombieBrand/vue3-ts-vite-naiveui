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
                  id: "1",
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
                  id: "2",
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
    response: ({ body }: { body: any }) => {
      return resultSuccess(body, { message: "批量上传成功!" });
    },
  },
  {
    url: "/api/user-manage/detail/:id",
    method: "get",
    response: () =>
      resultSuccess(
        {
          role: [
            {
              id: "1",
              title: "@cname",
            },
          ],
          remark: ["超级管理员", "BOSS", "@cname", "@cname"],
          experience: [
            {
              startTime: Mock.Random.date(),
              endTime: Mock.Random.date(),
              title: "@cname",
              desc: "@cparagraph",
            },
            {
              startTime: Mock.Random.date(),
              endTime: Mock.Random.date(),
              title: "@cname",
              desc: "@cparagraph",
            },
          ],
          id: Mock.Random.id(),
          openTime: Mock.Random.date(),
          username: "@name",
          title: "@cname",
          mobile: Mock.Random.integer(),
          avatar: "@image",
          gender: "男",
          nationality: "汉",
          address: "@region",
          major: "@cparagraph",
          glory: "@cparagraph",
        },
        { message: "获取员工信息成功" }
      ),
  },
  {
    url: "/api/user-manage/role/change",
    method: "post",
    statusCode: 200,
    response: ({ body }: { body: any }) => {
      return resultSuccess(body, { message: "修改成功!" });
    },
  },
] as MockMethod[];
