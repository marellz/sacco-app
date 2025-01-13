import express from "express";
import {
  get,
  getOne,
  create,
  submit,
  withdraw,
  destroy,
} from "#controllers/member/LoanApplicationController.js";
import verifyLoanApplicationAccess from "#middleware/loan/loanApplicationAccess.js";
import authenticate from "#middleware/authenticate.js"
const router = express.Router();

router.use([authenticate]);
router.get("/", get);
router.post("/", create);
router.get("/:id", getOne);
router.put("/:id/submit", submit);
router.put("/:id/withdraw", withdraw);
router.delete("/:id", destroy);

router.param("id", verifyLoanApplicationAccess);

export default router;
