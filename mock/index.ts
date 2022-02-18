import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import { resultSuccess } from "./utils";
const token = Mock.Random.string("upper", 32, 32);
interface loginData {
  body: {
    username: string;
    password: string;
  };
  [propName: string]: any;
}
export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }: loginData) => {
      return resultSuccess(
        { username: body.username, token },
        { message: "登陆成功" }
      );
    },
  },
  {
    url: "/api/getUserInfo",
    method: "get",
    response: () => {
      return resultSuccess(
        {
          role: [
            {
              id: "1",
              title: "超级管理员",
            },
          ],
          title: "@name",
          username: "@cname",
          age: "@integer(10-100)",
          _id: "@id",
          id: "0",
          avatar: "@image",
          city: "@city",
          country: "@county(true)",
          province: "@province",
          mobile_phone: Mock.Random.integer(),
          email: "@email",
          region: "@region",
          permission: {
            menus: [
              "userManage",
              "roleList",
              "permissionList",
              "articleRanking",
              "articleCreate",
            ],
            points: [
              "distributeRole",
              "importUser",
              "removeUser",
              "distributePermission",
            ],
          },
        },
        { message: "获取用户信息成功" }
      );
    },
  },
] as MockMethod[];
