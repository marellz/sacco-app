import { ROLE_MEMBER } from "#enums/user.js";
import User from "#models/User.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const createUser = async ({
  email,
  firstName,
  otherNames,
  password,
  roles,
  phoneNumbers,
}) => {

  const hashedPassword = await bcrypt.hash(password, 10);
  let avatar = faker.image.avatar();
  const activeRole = roles[0];
  
  const user = await User.create({
    firstName,
    otherNames,
    email,
    password: hashedPassword,
    avatar,
    roles,
    activeRole,
    phoneNumbers
  });

  return parseUser(user);
};

export const updateUser = async (params, body) => {
  const { firstName, otherNames, phoneNumbers, avatar } = body;

  await User.findOneAndUpdate(params, {
    firstName,
    otherNames,
    phoneNumbers,
    avatar,
  });
};

export const switchUserRole = async (params, body) => {
  const { role } = body;
  const user = await User.findOne(params);
  if (!user.roles.includes(role)) {
    throw "User does not have this role";
  }
  await User.findOneAndUpdate(params, {
    activeRole: role,
  });
};

export const parseUser = async (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    otherNames: user.otherNames,
    fullName: [user.firstName, user.otherNames].join(" "),
    avatar: user.avatar,
    joined: user.createdAt,
    roles: user.roles,
    phoneNumbers: user.phoneNumbers,
    activeRole: user.activeRole,
  };
};
