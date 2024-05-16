class clientDTO {
  id;
  nickname;
  dueDay;
  phone;
  active;
  paymentStatus;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.dueDay = data.dueDay;
    this.phone = data.phone;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
  }
}

export default clientDTO;
