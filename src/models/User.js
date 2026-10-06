export class User {
  constructor({ id = null, name, rut, route = null, role = "Repartidor" }) {
    this.id = id;
    this.name = name;
    this.rut = rut;
    this.route = route;
    this.role = role;
  }
}
