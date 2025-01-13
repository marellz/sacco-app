import express from "express";

import authenticate from "#middleware/authenticate.js";
import verify from "#middleware/loan/loanAccess.js";
import {
  get,
  getOne,
} from "#controllers/member/LoanController.js"

const router = express.Router();

router.use([authenticate])

router.get('/', get)
router.get('/:id', getOne)
router.param("id", verify)

export default router;
