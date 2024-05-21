// src/jobs/dailyTask.js
import cron from "node-cron";
import { sendDailyMessages } from "../service/utilsService.js";

cron.schedule("0 * * * * *", async () => {
  console.log("Iniciando tarefa diária às 8h");
  try {
    sendDailyMessages();
    console.log("Mensagens enviadas com sucesso");
  } catch (error) {
    console.error("Erro ao enviar mensagens:", error);
  }
});
