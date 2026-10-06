export class Package {
  constructor({ id, amount = 0, status = "Pendiente", commune = "", address = "", payMethod = null, time = null, routeId = null }) {
    this.id = id;
    this.amount = amount;
    this.status = status;
    this.commune = commune;
    this.address = address;
    this.payMethod = payMethod;
    this.time = time;
    this.routeId = routeId;
  }
}
