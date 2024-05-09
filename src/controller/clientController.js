import {
  createClientWithReportService,
  updateMonthlyReportOnDeleteService,
  getAllClientsService,
  getClientByIdService,
  updateClientByIdService,
  findClientsForNotifications,
} from "../service/clientService.js";

import sendWhatsAppMessage from "../service/whatsappService.js";

export const createClient = async (req, res) => {
  try {
    const client = await createClientWithReportService(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const results = await getAllClientsService(req.query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await getClientByIdService(req.params.id);
    res.json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updatedClient = await updateClientByIdService(
      req.params.id,
      req.body
    );
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await updateMonthlyReportOnDeleteService(req.params.id);
    res.json({ message: "Client deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function sendNotifications() {
  sendWhatsAppMessage("5583987865478", "*teste*");
}
