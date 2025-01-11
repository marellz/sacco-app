import User from "#models/User.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const getUserById = async (params) => {
  try {
    const user = await User.findById(params);
    return user;
  } catch (error) {
    throw error;
  } 
}

export const getUser = async (params) => {
    try {
      const user = await User.findOne(params);
      return user;
    } catch (error) {
      throw error;
    } 
}


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
    phoneNumbers,
  });

  return parseUser(user);
};

export const updateUser = async (id, body) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw "User not found";
    }

    const {
      firstName = user.firstName,
      otherNames = user.otherNames,
      phoneNumbers = user.phoneNumbers,
      avatar = user.avatar,
      roles = user.roles,
    } = body;

    await User.findOneAndUpdate(params, {
      firstName,
      otherNames,
      phoneNumbers,
      avatar,
      roles
    });
  } catch (error) {
    throw error;
  }
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

export const updateRoles = async (id, roles) => {
  try {
    await User.findOneAndUpdate(id, {
      roles,
    });
    
  } catch (error) {
    console.error(error)
    return error.message
  }
}

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

export default {
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateRoles,
  switchUserRole,
  parseUser,
};