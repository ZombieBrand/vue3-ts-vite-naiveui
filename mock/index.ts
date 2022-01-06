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
      return resultSuccess({ username: body.username, token });
    },
  },
  {
    url: "/api/getUserInfo",
    method: "post",
    response: ({ body = {} }) => {
      return {
        code: 200,
        data: {
          nickname: "@cname",
          age: "@integer(10-100)",
          uid: "@id",
          url: "@image",
          city: "@city",
          country: "@county(true)",
          province: "@province",
          mobile_phone: "@phone",
          email: "@email",
          region: "@region",
          body,
          menus: [
            {
              menu_name: "一级导航",
              id: "@id",
              code: "Nav1",
              children: [
                {
                  code: "about",
                  menu_url: "views/about",
                  access_permissions: '["about"]',
                  children: [],
                  menu_name: "测试1",
                  id: "@id",
                },
                {
                  code: "home",
                  menu_url: "views/home",
                  access_permissions: '["home"]',
                  children: [],
                  menu_name: "测试2",
                  id: "@id",
                },
              ],
            },
          ],
        },
      };
    },
  },
] as MockMethod[];
