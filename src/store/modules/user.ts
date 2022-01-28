import { defineStore } from "pinia";
import { loginRequest } from "@/api/user";
import * as T from "@/types/api/user";
import md5 from "md5";
import { getItem, setItem } from "@/utils/storage";
import { TOKEN } from "@/constant";
import router from "@/router/index";
export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}
export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    token: getItem(TOKEN) || "",
    username: "",
    welcome: "",
    avatar: "",
    permissions: [],
    info: {},
  }),
  actions: {
    login(userInfo: T.login) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        const { data, run } = loginRequest;
        run({
          username,
          password: md5(password),
        })
          .then((res) => {
            resolve(res);
            const {
              code,
              result: { token, username },
              type,
            } = data.value;
            console.log(code, type);
            setItem(TOKEN, token);
            this.token = token;
            this.username = username;
            router.push({ name: "Layout" });
          })
          .catch((error) => {
            reject(error);
            console.log(data.value);
          });
      });
    },
  },
  persist: true,
});
