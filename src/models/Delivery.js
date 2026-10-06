export class Delivery {
  constructor({ id = null, packageId, status = "Pendiente", payMethod = null, date = null, time = null }) {
    this.id = id;
    this.packageId = packageId;
    this.status = status;
    this.payMethod = payMethod;
    this.date = date;
    this.time = time;
  }
}
