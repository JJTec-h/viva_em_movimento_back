import Client from "../model/client.js";
import MonthlyReport from "../model/monthlyReport.js";
import sequelize from "../config/config.js";
import { literal, Op, fn, col } from "sequelize";

const createClientWithReportService = async (clientData) => {
  const transaction = await sequelize.transaction();
  try {
    const client = await Client.create(clientData, { transaction });
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const report = await MonthlyReport.findOne({
      where: { monthNumber: month, year: year },
      transaction,
    });

    if (report) {
      report.newClients += 1;
      report.activeClients += 1;
      await report.save({ transaction });
    } else {
      await MonthlyReport.create(
        {
          monthName: date.toLocaleString("default", { month: "long" }),
          monthNumber: month,
          year: year,
          activeClients: 1,
          clientsLeft: 0,
          newClients: 1,
        },
        { transaction }
      );
    }
    await transaction.commit();
    return client;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateMonthlyReportOnDeleteService = async (clientId) => {
  const transaction = await sequelize.transaction();
  try {
    const client = await Client.findByPk(clientId, { transaction });
    if (!client) {
      await transaction.rollback();
      throw new Error("Client not found");
    }
    await client.update({ active: false }, { transaction });

    const date = new Date();
    const report = await MonthlyReport.findOne({
      where: {
        monthNumber: date.getMonth() + 1,
        year: date.getFullYear(),
      },
      transaction,
    });

    if (report) {
      report.clientsLeft += 1;
      report.activeClients -= 1;
      await report.save({ transaction });
    } else {
      await MonthlyReport.create(
        {
          monthName: date.toLocaleString("default", { month: "long" }),
          monthNumber: date.getMonth() + 1,
          year: date.getFullYear(),
          activeClients: 0,
          clientsLeft: 1,
          newClients: 0,
        },
        { transaction }
      );
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

async function getAllClientsService(query) {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 6;
  const offset = (page - 1) * limit;
  const search = query.search || "";
  const isActive = query.isActive || true;

  const today = new Date().getDate();

  const { count, rows } = await Client.findAndCountAll({
    where: {
      active: `${isActive}`,
      name: {
        [Op.iLike]: `%${search}%`,
      },
    },
    limit,
    offset,
    order: [
      [
        literal(`(CASE WHEN "client"."dueDay" >= ${today} THEN 0 ELSE 1 END)`),
        "ASC",
      ],
      ["dueDay", "ASC"],
    ],
  });

  const totalPages = Math.ceil(count / limit);

  return {
    next: offset + limit < count ? { page: page + 1, limit } : null,
    previous: offset > 0 ? { page: page - 1, limit } : null,
    currentPage: page,
    totalPages: totalPages,
    results: rows,
  };
}

async function getClientByIdService(id) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
}

async function updateClientByIdService(id, updateData) {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error("Client not found");
  }
  return await client.update(updateData);
}

async function findClientsForNotifications() {
  const today = new Date();
  const tomorrow = new Date(today).getDate() + 1;
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const clients = await Client.findAll({
    where: {
      [Op.or]: {
        dueDay: tomorrow,
        [Op.and]: [
          sequelize.where(fn("EXTRACT", literal("'day' FROM birthdate")), day),
          sequelize.where(
            fn("EXTRACT", literal("'month' FROM birthdate")),
            month
          ),
        ],
      },
    },
  });

  return clients;
}

export {
  createClientWithReportService,
  updateMonthlyReportOnDeleteService,
  getAllClientsService,
  getClientByIdService,
  updateClientByIdService,
  findClientsForNotifications,
};
