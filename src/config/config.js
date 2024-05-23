import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Configuração para ambiente atual, assumindo NODE_ENV está definido, ou default para 'development'
const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    username: "gymdev",
    password: "1234",
    database: "vivaemmovimento",
    host: "db",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
}[env];

// Criando uma instância do Sequelize com as configurações específicas do ambiente
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const checkDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      console.log(
        "Banco de dados não encontrado, criando novo banco de dados..."
      );
      const adminConnection = new Sequelize(
        "postgres",
        config.username,
        config.password,
        {
          host: config.host,
          dialect: config.dialect,
          port: config.port,
          logging: false,
        }
      );
      await adminConnection.query(`CREATE DATABASE "${config.database}"`);
      console.log(`Banco de dados ${config.database} criado com sucesso.`);
      await adminConnection.close();
      // Recuperar após criação
      await sequelize.authenticate();
    } else {
      console.error("Erro ao conectar ao banco de dados:", error);
      throw error;
    }
  }
};

export default sequelize;
