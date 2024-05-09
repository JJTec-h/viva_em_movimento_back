import axios from "axios";
import { findClientsForNotifications } from "./clientService.js";

const API_URL = "http://localhost:8081/message/sendText/app";
const ACCESS_API_KEY =
  "AHIFQ3xj9AcVSIQ3aUdUk3BusZta0TlMUzdoama0ltK7ErFye5rHW8TNEcxBMT4mpZmXgGVYLNpa1jJMOGaxhhWiqYfrDTAWtzEUtTZuGEnS4Z71XioDu4iQWKBUm2Ce";

async function sendWhatsAppMessage(phoneNumber, message) {
  const payload = {
    number: phoneNumber,
    textMessage: {
      text: message,
    },
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        apikey: ACCESS_API_KEY,
      },
    });
    const clientes = await findClientsForNotifications();
    console.log("clientes", clientes);
    console.log("Mensagem enviada:", response.data);
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response ? error.response.data : error
    );
  }
}
export default sendWhatsAppMessage;
