// init-db.js
import sequelize from "./config.js";
import Client from "../model/client.js";
import MonthlyReport from "../model/monthlyReport.js";
import User from "../model/user.js";

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    // Sincronizar todos os modelos
    await sequelize.sync({ force: true });
    console.log("Banco de dados e tabelas criados com sucesso.");
  } catch (error) {
    console.error("Erro ao criar banco de dados:", error);
  } finally {
    await sequelize.close();
    console.log("Conexão encerrada.");
  }
}

initializeDatabase();
