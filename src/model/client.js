import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import Payment from "./payment.js";

class Client extends Model {}

Client.init(
  {
    // Definição dos campos
    nickname: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    enrollmentDate: DataTypes.DATEONLY,
    exitDate: DataTypes.DATEONLY,
    dueDay: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    lastPaymentDate: DataTypes.DATEONLY,
    paymentStatus: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "client",
  }
);

// Definindo a associação
Client.hasMany(Payment, { foreignKey: "clientId" });
Payment.belongsTo(Client, { foreignKey: "clientId" });

export default Client;
