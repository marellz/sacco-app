import express, { Request, Response } from "express";
import home from "../services/HomeService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const _home = home.index();

  res.json(_home);
});

export default router;
