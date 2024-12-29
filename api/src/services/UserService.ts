import { RegisterPayload, User } from "../types/auth";

export const createUser = async ({
  email,
  name,
  password,
}: RegisterPayload): Promise<User> => {
  const user: User = {
    _id: "id",
    name,
    email,
    avatar: 'avatar'
  };

  return user;
};
