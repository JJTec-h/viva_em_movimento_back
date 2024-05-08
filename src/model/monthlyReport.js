import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js"; // Certifique-se de que config.js exporte uma instância do Sequelize

class MonthlyReport extends Model {}

MonthlyReport.init(
  {
    monthName: DataTypes.STRING,
    monthNumber: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    activeClients: DataTypes.INTEGER,
    clientsLeft: DataTypes.INTEGER,
    newClients: DataTypes.INTEGER,
  },
  { sequelize, modelName: "monthlyReport" }
);

export default MonthlyReport;
