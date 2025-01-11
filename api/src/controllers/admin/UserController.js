import User from "#models/User.js";
import { sendWelcomeEmail } from "#services/mail/welcomeEmail.js";
import UserService from "#services/UserService.js";
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
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      data: user,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  // todo: implement
};

export const createUser = async (req, res) => {
  try {
    const { firstName, otherNames, email, phoneNumbers, roles } = req.body;

    const password = generate();

    // validate

    const user = await UserService.createUser({
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
export const updateUser = async (req, res) => {
  try {
    const { roles } = req.body;
    const id = req.params.id;
    if(_id !== id){
      throw "Invalid user id";
    }

    await UserService.updateUser(id, { roles });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.body
    if(!roles || !roles.length || !id){
      return res.status(500).json({ error: "Invalid request" });
    }

    // current user must have admin role, and must not remove it
    if(req.user._id === id && !roles.includes("admin")){
      return res.status(500).json({ error: "You cannot." });
    }

    await UserService.updateRoles({ _id: id }, roles);
    const user = await UserService.getUserById(id);

    if(!user){
      return res.status(500).json({ error: "User not found" });
    }

    return res.json({
      data: user.roles,
    });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error});
  }
}
