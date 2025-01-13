import { Router } from "express";
import { getMany, getOne, verify } from "#controllers/admin/LoanController.js";
import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

const router = Router();

router.use([authenticate, admin]);

router.get("/", getMany);
// router.get('/:id', getOne)
router.param("id", verify)

export default router;
