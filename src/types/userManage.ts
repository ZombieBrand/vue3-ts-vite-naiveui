interface Role {
  id: string;
  title: string;
}
export type User = {
  username: string;
  avatar: string;
  id: string;
  _id: string;
  mobile: number;
  openTime: string;
  role: Array<Role | never>;
};
