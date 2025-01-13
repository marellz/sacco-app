import Loan from "#models/Loan.js";
import User from "#models/User.js";
import fail from "#utils/fail.js";

/**
 * if !authenticated
 *   fail()
 * if admin || currentUser === resource.id
 *   next
 * else
 *   fail()
 */

export const verify = async (req, res, next, id) => {
  const user = await User.findById(req.user.id);
  const resource = await Loan.findById(id);

  if (!resource) {
    fail("Loan not found");
  }

  if (!user) {
    fail("User not found");
  }

  if (user.activeRole !== "admin" || resource.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};

export default verify;
