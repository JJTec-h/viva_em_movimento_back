import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js"; // Certifique-se de que config.js exporte uma instância do Sequelize

class Client extends Model {}

Client.init(
  {
    nickname: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    enrollmentDate: DataTypes.DATEONLY,
    exitDate: DataTypes.DATEONLY,
    dueDay: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "client" }
);

export default Client;
