import { ROLE_MEMBER } from "#enums/user.js";
import User from "#models/User.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const createUser = async ({
  email,
  firstName,
  otherNames,
  password,

  // TODO: IMPLEMENT: For any other role, the current user 
  // has to have ROLE_ADMIN as activeRole
  activeRole = ROLE_MEMBER,
  roles = [activeRole],
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  let avatar = faker.image.avatar();
  const user = await User.create({
    firstName,
    otherNames,
    email,
    password: hashedPassword,
    avatar,
    roles,
    activeRole,
  });

  return parseUser(user);
};

export const parseUser = async (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    otherNames: user.otherNames,
    fullName: [user.firstName, user.otherNames].join(' '),
    avatar: user.avatar,
    joined: user.createdAt,
    roles: user.roles,
    activeRole: user.activeRole,
  };
};
