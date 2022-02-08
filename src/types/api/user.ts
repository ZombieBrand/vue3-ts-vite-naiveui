import Mock from "mockjs";

export interface login {
  username: string;
  password: string;
}

export interface IUserState {
  token: string;
  userInfo: Object;
}
