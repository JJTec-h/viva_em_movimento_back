import expensesDTO from "./expensesDTO.js";

class monthlyReportUserDTO {
  entradasAtual;
  saidasAtual;
  faturamentoAtual;
  nomeMesAtual;
  gastos;
  constructor(data) {
    this.entradasAtual = data.newClients;
    this.saidasAtual = data.clientsLeft;
    this.faturamentoAtual = data.amount;
    this.nomeMesAtual = data.monthName;
    this.gastos = new expensesDTO(
      data.personalExpense,
      data.energyExpense,
      data.waterExpense,
      data.siteExpense,
      data.otherExpense
    );
  }
}

export default monthlyReportUserDTO;
