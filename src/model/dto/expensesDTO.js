class expensesDTO {
  energia;
  agua;
  personal;
  site;
  outros;
  total;

  constructor(personal, energy, water, site, other) {
    this.personal = personal;
    this.energia = energy;
    this.agua = water;
    this.site = site;
    this.outros = other;
    this.total =
      this.agua + this.energia + this.personal + this.site + this.outros;
  }
}

export default expensesDTO;
