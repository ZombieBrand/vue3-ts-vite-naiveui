export interface TPermission {
  id: string;
  permissionName: string;
  permissionMark: string;
  permissionDesc: string;
  children: TPermission[] | [];
}
