import axios from "axios";
import {
  clientIsBirthdate,
  clientIsExpirationDueDay,
  clientIsExpirationPayment,
  findClientsForNotifications,
  resetStatusPaymentClient,
} from "./clientService.js";
import { updateStatusPaymentClientByIdService } from "./clientService.js";
import Payment from "../model/payment.js";
import { updateInvoicing } from "./monthyReportService.js";
import sequelize from "../config/config.js";

const API_URL = process.env.API_EVOLUTION;
const ACCESS_API_KEY = process.env.API_KEY_EVOLUTION;

async function sendWhatsAppMessage(phoneNumber, message) {
  const payload = {
    number: `+55${phoneNumber}`,
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
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response ? error.response.data : error
    );
  }
}

async function confirmPaymentUtils(clientId, amount) {
  amount = parseFloat(amount);
  if (isNaN(amount)) {
    throw "O valor de amount deve ser um número válido.";
  }

  const transaction = await sequelize.transaction();
  try {
    const currentDate = new Date();
    const paymentDate = currentDate;
    const month = paymentDate.getMonth() + 1;
    const year = paymentDate.getFullYear();

    //Atualiza informacoes de pagamento no cliente
    await updateStatusPaymentClientByIdService(
      clientId,
      transaction,
      paymentDate
    );

    // Insere um novo registro de pagamento
    await Payment.create(
      {
        clientId,
        amount,
        paymentDate,
        month,
        year,
      },
      { transaction }
    );

    // Atualiza o relatório mensal
    await updateInvoicing(month, year, amount, transaction, paymentDate);

    await transaction.commit();
    return { message: "Pagamento confirmado com sucesso!" };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function createMessageForBirthdate(nameClient) {
  return `Parabéns, ${nameClient} lhe desejo muitos anos de vida!`;
}

async function createMessageForExpirationDueDay(nameClient, dueDay) {
  return `Olá, ${nameClient}, espero que esteja tudo bem. \n
  Passando para lembrar que amanha ${dueDay} é o dia do pagamento da academia.`;
}

async function sendDailyMessages() {
  const clients = await findClientsForNotifications();
  clients.forEach(async (client) => {
    console.log(client.nickname, client.dueDay);
    // if (clientIsBirthdate(client.dueDay)) {
    //   let message = `Parabéns, ${client.nickname} lhe desejo muitos anos de vida!`;
    //   sendWhatsAppMessage(client.phone, message);
    // }
    if (clientIsExpirationDueDay(client.dueDay)) {
      let message = `Olá, ${client.nickname}, espero que esteja tudo bem.
      Passando para lembrar que amanha ${client.dueDay} 
      é o dia do pagamento da academia.`;
      sendWhatsAppMessage(client.phone, message);
    }
    if (clientIsExpirationPayment(client.dueDay)) {
      resetStatusPaymentClient(client.id);
    }
  });
}

export { sendWhatsAppMessage, confirmPaymentUtils, sendDailyMessages };
