import User from "#models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import generateToken from "#utils/generate-token.js";
dotenv.config();

import { createUser, parseUser, updateUser, switchUserRole } from "#services/UserService.js";
import { ROLE_MEMBER } from "#enums/user.js";

export const user = async (req, res) => {
  try {
    const { _id, name, email } = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.json({ data: { _id, name, email } });
  } catch (error) {
    return res.status(500).json({
      error: "Error returning user",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email/password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email/password" });
    }

    // todo: sign with user id, not email
    const token = generateToken(user._idid, user.email);

    res.status(200).json({ token, data: await parseUser(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, otherNames, email, password, phoneNumbers = [] } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const roles = [ROLE_MEMBER]

    const user = await createUser({ firstName, otherNames, email, password, roles, phoneNumbers });

    const id = user._id;

    const token = generateToken(id, email);

    sendWelcomeEmail(user.email, user.firstName);

    return res.json({
      data: user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  return res.json({ message: "Logged out" });
};

export const recoverPassword = () => {
  try {
    // find user
    // generate token
    // send email to user with token link
  } catch (error) {}
};

export const resetPassword = () => {
  // verify token
  // admit passwords
  // change the password
};

export const update = async (req, res) => {
  try {
    const userParams = { email: req.user.email };
    await updateUser(userParams, req.body);
    const updatedUser = await User.findOne(userParams);

    return res.json({
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        updated: false,
        error: "User in request does not exist",
      });
    }

    const { current, new_pass } = req.body;

    const passwordMatches = await bcrypt.compare(current, user.password);

    if (!passwordMatches) {
      return res.status(400).json({
        error: "Current password is not valid",
      });
    }

    const hashedPassword = await bcrypt.hash(new_pass, 10);

    await User.findOneAndUpdate(
      { email: user.email },
      {
        password: hashedPassword,
      }
    );

    return res.json({
      updated: true,
    });
  } catch ({ message }) {
    return res.status(500).json({
      updated: false,
      error: "Error updating password",
      message,
    });
  }
};

export const switchRole = async (req, res) => {
  try {
    await switchUserRole({ email: req.user.email }, req.body);
    return res.json({
      activeRole: req.body.role,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error });
  }
};
