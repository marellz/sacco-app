import Loan from "#models/Loan.js";
import User from "#models/User.js";

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

  if (user.activeRole === "admin" || resource.user === user._id) {
    next();
  }

  fail("Problem verifying things");
};

export default verify;
