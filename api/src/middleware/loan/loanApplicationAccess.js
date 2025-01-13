import LoanApplication from "#models/LoanApplication.js";
import User from "#models/User.js";
import fail from "#utils/fail.js";

const verify = async (req, res, next, id) => {
  const user = await User.findById(req.user.id);

  const resource = await LoanApplication.findById(id);

  if (!resource) {
    fail("Loan application not found");
  }

  if (!user) {
    fail("User not found");
  }

  if (user.activeRole !== "admin" && resource.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

export default verify;
