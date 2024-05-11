class clientDTO {
  id;
  nickname;
  dueDay;
  phone;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.dueDay = data.dueDay;
    this.phone = data.phone;
  }
}

export default clientDTO;
