interface Role {
  id: string;
  title: string;
}
export type User = {
  username: string;
  avatar: string;
  id: string;
  mobile: string;
  openTime: string;
  role: Array<Role | never>;
};
