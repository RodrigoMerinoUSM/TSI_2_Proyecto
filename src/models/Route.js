export class Route {
  constructor({ id, date = null, repartidor = "", userId = null, packages = [] }) {
    this.id = id;
    this.date = date;
    this.repartidor = repartidor;
    this.userId = userId;
    this.packages = packages;
  }
}
