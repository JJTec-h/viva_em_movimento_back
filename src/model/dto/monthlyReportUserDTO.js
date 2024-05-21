class monthlyReportUserDTO {
  entradasAtual;
  saidasAtual;
  faturamentoAtual;
  nomeMesAtual;
  entradasAnterior;
  saidasAnterior;
  faturamentoAnterior;
  nomeMesAnterior;
  constructor(data) {
    if (data.length > 1) {
      this.entradasAtual = data[0].newClients;
      this.saidasAtual = data[0].clientsLeft;
      this.faturamentoAtual = data[0].amount;
      this.nomeMesAtual = data[0].monthName;
      this.entradasAnterior = data[1].newClients;
      this.saidasAnterior = data[1].clientsLeft;
      this.faturamentoAnterior = data[1].amount;
      this.nomeMesAnterior = data[1].monthName;
    } else {
      this.entradasAtual = data.newClients;
      this.saidasAtual = data.clientsLeft;
      this.faturamentoAtual = data.amount;
      this.nomeMesAtual = data.monthName;
    }
  }
}

export default monthlyReportUserDTO;
