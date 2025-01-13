import { Router } from "express";
import { getActive, getLoan } from "#controllers/admin/LoanController.js";
import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

const router = Router();

router.use([authenticate, admin]);

router.get("/active", getActive);

export default router;
