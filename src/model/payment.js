import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js"; // Certifique-se de que config.js exporte uma instância do Sequelize

class Payment extends Model {}

Payment.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients", // Nome da tabela a qual esta chave estrangeira se refere
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "payment", // Nome da tabela no banco de dados
    timestamps: true, // Para incluir os campos createdAt e updatedAt
  }
);

export default Payment;
