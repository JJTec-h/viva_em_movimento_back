import MonthlyReport from "../model/monthlyReport.js";

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

async function updateInvoicing(month, year, amount, transaction) {
  const report = await MonthlyReport.findOne({
    where: {
      monthNumber: month,
      year: year,
    },
    transaction,
  });

  if (report) {
    report.invoicing = parseFloat(report.invoicing) + amount;
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
        invoicing: amount,
      },
      { transaction }
    );
  }
}

export { getReport, updateInvoicing };
