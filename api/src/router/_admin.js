import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateRoles,
} from "#controllers/admin/UserController.js";

import {
  get as getLoanApplications,
  reject as rejectLoanApplication,
  approve as approveLoanApplication,
  disburse as disburseLoanApplication,
} from "#controllers/admin/LoanApplicationController.js";

import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

const router = express.Router();

router.get("/users", [authenticate, admin], getUsers);
router.post("/users", [authenticate, admin], createUser);
router.get("/users/:id", [authenticate, admin], getUser);
router.put("/users/:id", [authenticate, admin], updateUser);
router.put("/users/:id/roles", [authenticate, admin], updateRoles);

router.get("/loan/applications", [authenticate, admin], getLoanApplications);
router.put(
  "/loan/applications/:id/reject",
  [authenticate, admin],
  rejectLoanApplication
);
router.put(
  "/loan/applications/:id/approve",
  [authenticate, admin],
  approveLoanApplication
);
router.put(
  "/loan/applications/:id/disburse",
  [authenticate, admin],
  disburseLoanApplication
);

export default router;
