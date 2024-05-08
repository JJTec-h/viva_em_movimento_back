import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js"; // Certifique-se de que config.js exporte uma instância do Sequelize

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

export default User;
