import Client from "../model/client.js";
import sequelize from "../config/config.js";
import { literal, Op } from "sequelize";
import MonthlyReport from "../model/monthlyReport.js";

export const createClient = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const client = await Client.create(req.body, { transaction });

    const date = new Date();
    const report = await MonthlyReport.findOne(
      {
        where: {
          monthNumber: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      },
      { transaction }
    );

    if (report) {
      report.newClients += 1;
      report.activeClients += 1;
      await report.save({ transaction });
    } else {
      await MonthlyReport.create(
        {
          monthName: date.toLocaleString("default", { month: "long" }),
          monthNumber: date.getMonth() + 1,
          year: date.getFullYear(),
          activeClients: 1,
          clientsLeft: 0,
          newClients: 1,
        },
        { transaction }
      );
    }
    await transaction.commit();
    res.status(201).send(client);
  } catch (error) {
    await transaction.rollback();
    res.status(400).send(error);
  }
};

export const getAllClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";
    const isActive = req.query.isActive || true;

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
          literal(
            `(CASE WHEN "client"."dueDay" >= ${today} THEN 0 ELSE 1 END)`
          ),
          "ASC",
        ],
        ["dueDay", "ASC"],
      ],
    });
    const totalPages = Math.ceil(count / limit);
    const results = {
      next: null,
      previous: null,
      currentPage: page,
      totalPages: totalPages,
      results: rows,
    };

    if (offset + limit < count) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (offset > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getClient = async (req, res) => {
  try {
    console.log("get");
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    const updatedClient = await client.update(req.body);
    res.send(updatedClient);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteClient = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const client = await Client.findByPk(req.params.id, { transaction });
    if (!client) {
      await transaction.rollback();
      return res.status(404).send({ message: "Client not found" });
    }

    // Marcar o cliente como inativo, em vez de deletar
    await client.update({ active: false }, { transaction });

    const date = new Date();
    const report = await MonthlyReport.findOne(
      {
        where: {
          monthNumber: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      },
      { transaction }
    );

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
    res.send({ message: "Client deactivated successfully" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send(error);
  }
};
