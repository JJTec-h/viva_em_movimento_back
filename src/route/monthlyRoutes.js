import express from "express";
import {
  getMonthlyReport,
  getMonthlyReportUser,
} from "../controller/monthlyController.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.get("/usuario", authenticate, getMonthlyReportUser);
router.get("/", authenticate, getMonthlyReport);

export default router;
