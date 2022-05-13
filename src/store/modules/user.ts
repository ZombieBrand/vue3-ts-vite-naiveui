import { defineStore } from "pinia";
import { loginRequest, getUserInfoRequest } from "@/api/user";
import type * as T from "@/types/api/user";
import md5 from "md5";
import { getItem, removeAllItem, setItem } from "@/utils/storage";
import { TOKEN } from "@/constant";
import router from "@/router/index";
import { setTimeStamp } from "@/utils/auth";

const initUserInfo = () => ({
  role: [],
  title: "",
  username: "",
  age: "",
  _id: "",
  id: "",
  avatar: "",
  city: "",
  country: "",
  province: "",
  mobile_phone: "",
  email: "",
  region: "",
  permission: {
    menus: [],
    points: [],
  },
});

export const useUserStore = defineStore("user", {
  state: (): T.IUserState => ({
    token: getItem(TOKEN) || "",
    userInfo: initUserInfo(),
  }),
  actions: {
    login(userInfo: T.login) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        loginRequest({
          username,
          password: md5(password),
        })
          .then((res) => {
            console.log(res);
            const { data } = res;
            const token = data.access_token;
            setItem(TOKEN, token);
            this.token = token;
            router.push("/");
            // 保存登陆时间
            setTimeStamp();
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfoRequest();
        this.userInfo.id = data.id;
        this.userInfo.role = [data.role];
        this.userInfo.username = data.username;
        this.userInfo.email = data.email;
        return data;
      } catch (e) {
        console.log(e);
        window.$message("error", "获取用户信息失败!");
      }
    },
    async loginOut() {
      setItem(TOKEN, "");
      this.token = "";
      this.userInfo = initUserInfo();
      removeAllItem();
      try {
        await router.push("/login");
      } catch (e) {
        console.log(e);
        window.$message("error", "退出登陆失败!");
      }
    },
  },
  persist: true,
});
