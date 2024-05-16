import { convertDateView } from "../../service/clientService.js";

class clientDTO {
  id;
  nickname;
  dueDay;
  phone;
  active;
  paymentStatus;
  lastPaymentDate;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.dueDay = data.dueDay;
    this.phone = data.phone;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    convertDateView(data.lastPaymentDate).then((res) => {
      this.lastPaymentDate = res;
    });
  }
}

export default clientDTO;
