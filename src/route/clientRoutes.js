import express from "express";
import {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClient,
} from "../controller/clientController.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.post("/", authenticate, createClient);
router.get("/", authenticate, getAllClients);
router.get("/:id", authenticate, getClient);
router.put("/:id", authenticate, updateClient);
router.delete("/:id", authenticate, deleteClient);

export default router;
