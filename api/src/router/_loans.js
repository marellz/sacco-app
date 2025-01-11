import express from "express";
import {
  get,
  create,
  submit,
  withdraw,
  destroy,
} from "#controllers/member/LoanApplicationController.js";
import authenticate from "#middleware/authenticate.js";

const router = express.Router();

// todo: member routes
router.get("/applications", authenticate, get);
router.post("/applications", authenticate, create);
router.delete("/applications/:id", authenticate, destroy);
router.put("/applications/:id/submit", authenticate, submit);
router.put("/applications/:id/withdraw", authenticate, withdraw);

export default router;
