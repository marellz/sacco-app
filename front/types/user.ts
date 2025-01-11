export interface User {
  firstName: string;
  otherNames: string;
  avatar: string;
  id: string;
  email: string;
  roles: UserRole[];
  activeRole: UserRole;
  phoneNumbers: string[];
}
//todo: use constansts
export type UserRole = "member" | "admin" | "audit";
export type OtherUser = Omit<User, "id"> & { _id: string };