import { Router } from "express";
import {
  getMany,
  reject,
  approve,
  disburse,
  verify,
} from "#controllers/admin/LoanApplicationController.js";

import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

const router = Router();

router.use([authenticate, admin]);

router.get("/", getMany);
router.put("/:id/reject", reject);
router.put("/:id/approve", approve);
router.put("/:id/disburse", disburse);

router.param("id", verify)

export default router;
