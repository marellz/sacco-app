import User from "#models/User.js";

const admin = async (req, res, next) => {
  if (!(req.user && req.user.email)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findOne({email: req.user.email});

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (user.activeRole !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
    
  } catch (error) {
    return res.status(401).json({ error: `Authorization error. ${error.message}` });
  }
};

export default admin;
