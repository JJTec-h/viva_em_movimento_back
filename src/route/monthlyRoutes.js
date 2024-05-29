import express from "express";
import {
  getMonthlyReport,
  getMonthlyReportUser,
  updateMonthlyExpenses,
} from "../controller/monthlyController.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.get("/usuario", authenticate, getMonthlyReportUser);
router.get("/", authenticate, getMonthlyReport);
router.put("/gastos", authenticate, updateMonthlyExpenses);

export default router;
