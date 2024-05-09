import express from "express";
import {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClient,
  sendNotifications,
} from "../controller/clientController.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.post("/", authenticate, createClient);
router.post("/send", sendNotifications);
router.get("/", authenticate, getAllClients);
router.get("/:id", authenticate, getClient);
router.put("/:id", authenticate, updateClient);
router.delete("/:id", authenticate, deleteClient);

export default router;
