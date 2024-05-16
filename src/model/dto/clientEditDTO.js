import { convertDate } from "../../service/clientService.js";

class clientEditDTO {
  id;
  nickname;
  dueDay;
  phone;
  active;
  name;
  birthdate;
  enrollmentDate;
  paymentStatus;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.dueDay = data.dueDay;
    this.phone = data.phone;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    this.name = data.name;
    convertDate(data.birthdate).then((res) => {
      this.birthdate = res;
    });
    convertDate(data.enrollmentDate).then((res) => {
      this.enrollmentDate = res;
    });
  }
}

export default clientEditDTO;
