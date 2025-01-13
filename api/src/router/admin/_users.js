import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateRoles,
} from "#controllers/admin/UserController.js";

import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

import { Router } from "express";

const router = Router();

router.use([authenticate, admin]);

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/:id/roles", updateRoles);

export default router;
