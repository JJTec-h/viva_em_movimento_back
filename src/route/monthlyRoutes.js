import express from "express";
import { getMonthlyReport } from "../controller/monthlyController.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.get("/", authenticate, getMonthlyReport);

export default router;
