import express from "express";
const router = express.Router();
import {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClient,
  getCountActiveClients,
  getAllClientsNotActive,
} from "../controller/clientController.js";

router.get("/quantidade", getCountActiveClients);
router.get("/desativados", getAllClientsNotActive);
router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
