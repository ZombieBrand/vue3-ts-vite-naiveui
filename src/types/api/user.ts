export interface login {
  username: string;
  password: string;
}

interface TUserInfo {
  role: object[];
  title: string;
  username: string;
  age: number | string;
  _id: string;
  id: string;
  avatar: string;
  city: string;
  country: string;
  province: string;
  mobile_phone: number | string;
  email: string;
  region: string;
  permission: {
    menus: string[];
    points: string[];
  };
}

export interface IUserState {
  token: string;
  userInfo: TUserInfo;
}
