import User from "#models/User.js";
import { sendWelcomeEmail } from "#services/mail/welcomeEmail.js";
import { createUser as creationService } from "#services/UserService.js";
import generate from "#utils/generate-string.js";

export const getUsers = async (req, res) => {
  try {
    let { query } = req.query;

    let searchParams = {};

    if (query) {
      let regex = {
        $regex: query,
        $options: "i",
      };

      searchParams = {
        $or: [
          { firstName: regex },
          { otherNames: regex },
          { email: regex },
          { phoneNumbers: { $elemMatch: regex } },
        ],
      };
    }

    const users = await User.find(searchParams);

    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const getUser = async (req, res) => {};

export const verifyUser = async (req, res) => {};

export const createUser = async (req, res) => {
  try {
    const { firstName, otherNames, email, phoneNumbers, roles } = req.body;

    const password = generate();

    // validate

    const user = await creationService({
      email,
      firstName,
      otherNames,
      password,
      roles,
      phoneNumbers,
    });

    if(user) {
      sendWelcomeEmail(user.email, user.firstName, password);
    }

    return res.json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
export const updateUser = async (req, res) => {};
