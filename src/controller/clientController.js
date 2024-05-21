import {
  createClientWithReportService,
  updateMonthlyReportOnDeleteService,
  getAllClientsService,
  getClientByIdService,
  updateClientByIdService,
  findClientsForNotifications,
  updateMonthlyReportOnActiveClientService,
} from "../service/clientService.js";
import {
  sendWhatsAppMessage,
  confirmPaymentUtils,
} from "../service/utilsService.js";

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
    console.log(error);
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

export const activeClient = async (req, res) => {
  try {
    await updateMonthlyReportOnActiveClientService(req.params.id);
    res.json({ message: "Client actived successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function sendNotifications() {
  sendWhatsAppMessage("5583987865478", "*teste*");
}

export const confirmPayment = async (req, res) => {
  const { clientId, amount } = req.body.params;
  try {
    const result = await confirmPaymentUtils(clientId, amount);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
