class clientDTO {
  id;
  nickname;
  dueDay;
  phone;
  active;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.dueDay = data.dueDay;
    this.phone = data.phone;
    this.active = data.active;
  }
}

export default clientDTO;
