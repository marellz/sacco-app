import express from "express";
import { getUsers, getUser, createUser, updateUser } from "#controllers/admin/UserController.js";
import authenticate from "#middleware/authenticate.js";
import admin from "#middleware/is-admin.js";

const router = express.Router();

router.get("/users", [authenticate, admin], getUsers);
router.post("/users", [authenticate, admin], createUser);
router.get("/users/:id", [authenticate, admin], getUser);
router.put("/users/:id", [authenticate, admin], updateUser)

export default router;
