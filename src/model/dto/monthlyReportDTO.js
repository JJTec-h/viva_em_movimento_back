class clientDTO {
  activeClients;
  clientsLeft;
  newClients;
  constructor(data) {
    this.activeClients = data.activeClients;
    this.clientsLeft = data.clientsLeft;
    this.newClients = data.newClients;
  }
}

export default clientDTO;
