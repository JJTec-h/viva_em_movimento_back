import MonthlyReport from "../model/monthlyReport.js";
import monthlyReportUserDTO from "../model/dto/monthlyReportUserDTO.js";
import { Op } from "sequelize";

async function getReport(year, monthNumber) {
  try {
    const result = await MonthlyReport.findOne({
      where: {
        monthNumber: `${monthNumber}`,
        year: `${year}`,
      },
    });
    return result;
  } catch (error) {
    throw new Error("erro ao obter relatorio mensal: ", error);
  }
}
async function getReportForUser(year, monthNumber) {
  try {
    const result = await MonthlyReport.findAll({
      where: {
        [Op.or]: [
          {
            monthNumber: monthNumber,
          },
          {
            monthNumber: monthNumber - 1,
          },
        ],
        year: `${year}`,
      },
    });

    const resultDTO = new monthlyReportUserDTO(result);
    return resultDTO;
  } catch (error) {
    console.log(error);
    throw new Error("erro ao obter relatorio mensal: ", error);
  }
}

async function updateInvoicing(month, year, amount, transaction, paymentDate) {
  const report = await MonthlyReport.findOne({
    where: {
      monthNumber: month,
      year: year,
    },
    transaction,
  });

  if (report && report.amount) {
    report.amount = parseFloat(report.amount) + amount;
    await report.save({ transaction });
  } else if (report && !report.amount) {
    console.log("report att");
    report.amount = amount;
    await report.save({ transaction });
  } else {
    await MonthlyReport.create(
      {
        monthName: paymentDate.toLocaleString("pt-BR", { month: "long" }),
        monthNumber: month,
        year: year,
        activeClients: 1,
        clientsLeft: 0,
        newClients: 0,
        amount: amount,
      },
      { transaction }
    );
  }
}

export { getReport, updateInvoicing, getReportForUser };
