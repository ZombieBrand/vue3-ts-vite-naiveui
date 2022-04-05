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

export interface TUserDetailData {
  role: TRole[];
  remark: string[];
  experience: TExperience[];
  id: string;
  openTime: string | Date;
  username: string;
  title: string;
  mobile: number | string;
  avatar: string;
  gender: string;
  nationality: string;
  address: string;
  major: string;
  glory: string;
}

export interface TExperience {
  startTime: Date;
  endTime: Date;
  title: string;
  desc: string;
}

export interface TRole {
  id: string;
  title: string;
}
