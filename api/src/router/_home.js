import express from "express";
import home from "../services/HomeService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const _home = home.index();

  res.json(_home);
});

export default router;
