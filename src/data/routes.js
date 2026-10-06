export const ROUTE_HISTORY = [
  {
    route: "R-105", date: "09 Ene 2024", repartidor: "María González Silva",
    packages: [
      { id: "BEX-2024-001230", amount: 6800, status: "Entregado", commune: "Ñuñoa", time: "09:14", payMethod: "Efectivo" },
      { id: "BEX-2024-001231", amount: 11200, status: "Entregado", commune: "Providencia", time: "10:32", payMethod: "Débito" },
    ],
  },
  {
    route: "R-213", date: "08 Ene 2024", repartidor: "Pedro Vargas León",
    packages: [
      { id: "BEX-2024-001218", amount: 9500, status: "Entregado", commune: "Las Condes", time: "08:55", payMethod: "Débito" },
      { id: "BEX-2024-001219", amount: 4200, status: "No entregado", commune: "Vitacura", time: "09:40" },
    ],
  },
  {
    route: "R-078", date: "07 Ene 2024", repartidor: "Ana Ramírez Torres",
    packages: [
      { id: "BEX-2024-001200", amount: 7800, status: "Entregado", commune: "Maipú", time: "09:05", payMethod: "Efectivo" },
      { id: "BEX-2024-001201", amount: 6500, status: "Entregado", commune: "Maipú", time: "10:20", payMethod: "Efectivo" },
      { id: "BEX-2024-001202", amount: 3900, status: "No entregado", commune: "Pudahuel", time: "11:10" },
      { id: "BEX-2024-001203", amount: 5200, status: "No entregado", commune: "Cerrillos", time: "12:30" },
    ],
  },
];

export const OTHER_TODAY_ROUTES = [
  {
    route: "R-105", repartidor: "María González Silva",
    packages: [
      { id: "BEX-2024-001260", amount: 6800, status: "Entregado", commune: "Ñuñoa", address: "Irarrázaval 2100", time: "09:10", payMethod: "Efectivo" },
      { id: "BEX-2024-001261", amount: 11200, status: "Entregado", commune: "Providencia", address: "Los Leones 890", time: "10:05", payMethod: "Débito" },
    ],
  },
  {
    route: "R-213", repartidor: "Pedro Vargas León",
    packages: [
      { id: "BEX-2024-001270", amount: 2890, status: "Pendiente", commune: "Vitacura", address: "El Golf 120", time: "08:45" },
      { id: "BEX-2024-001271", amount: 2000, status: "Pendiente", commune: "Las Condes", address: "Apoquindo 3500", time: "09:50" },
    ],
  },
];

export const ADMIN_HISTORY = [
  {
    label: "Ayer", date: "09 Ene 2024",
    routes: [
      { route: "R-042", repartidor: "Jorge Espinoza Ramos", packages: [
        { id: "BEX-2024-001230", amount: 6800, status: "Entregado", commune: "Ñuñoa", address: "Irarrázaval 2100", time: "09:14", payMethod: "Efectivo" },
        { id: "BEX-2024-001231", amount: 11280, status: "Entregado", commune: "Providencia", address: "Los Leones 890", time: "10:32", payMethod: "Débito" },
        { id: "BEX-2024-001232", amount: 4500, status: "Entregado", commune: "Ñuñoa", address: "Grecia 450", time: "11:55", payMethod: "Efectivo" },
        { id: "BEX-2024-001233", amount: 3200, status: "Pendiente", commune: "Macul", address: "Departamental 123", time: "12:10" },
      ] },
      { route: "R-105", repartidor: "María González Silva", packages: [
        { id: "BEX-2024-001240", amount: 15800, status: "Entregado", commune: "Las Condes", address: "Apoquindo 4500", time: "09:30", payMethod: "Débito" },
        { id: "BEX-2024-001241", amount: 9620, status: "Entregado", commune: "Vitacura", address: "El Golf 200", time: "11:00", payMethod: "Efectivo" },
        { id: "BEX-2024-001242", amount: 12000, status: "Pendiente", commune: "Las Condes", address: "Tobalaba 890", time: "13:00" },
      ] },
    ],
  },
  {
    label: "Hace 2 días", date: "08 Ene 2024",
    routes: [
      { route: "R-042", repartidor: "Jorge Espinoza Ramos", packages: [
        { id: "BEX-2024-001210", amount: 9500, status: "Entregado", commune: "Las Condes", address: "Av. Kennedy 5600", time: "08:55", payMethod: "Débito" },
        { id: "BEX-2024-001211", amount: 7200, status: "Entregado", commune: "Providencia", address: "Suecia 120", time: "10:10", payMethod: "Efectivo" },
        { id: "BEX-2024-001212", amount: 3100, status: "Pendiente", commune: "Ñuñoa", address: "Irarrázaval 3400", time: "11:30" },
      ] },
      { route: "R-078", repartidor: "Ana Ramírez Torres", packages: [
        { id: "BEX-2024-001220", amount: 9000, status: "Entregado", commune: "Maipú", address: "Pajaritos 2100", time: "09:20", payMethod: "Efectivo" },
        { id: "BEX-2024-001221", amount: 5100, status: "Pendiente", commune: "Maipú", address: "Américo Vespucio 800", time: "10:50" },
      ] },
    ],
  },
  {
    label: "Hace 3 días", date: "07 Ene 2024",
    routes: [
      { route: "R-042", repartidor: "Jorge Espinoza Ramos", packages: [
        { id: "BEX-2024-001190", amount: 12300, status: "Entregado", commune: "Providencia", address: "Condell 450", time: "09:00", payMethod: "Efectivo" },
        { id: "BEX-2024-001191", amount: 8700, status: "Entregado", commune: "Santiago", address: "Merced 280", time: "10:30", payMethod: "Débito" },
      ] },
      { route: "R-213", repartidor: "Pedro Vargas León", packages: [
        { id: "BEX-2024-001195", amount: 6200, status: "Entregado", commune: "San Miguel", address: "Club Hípico 1000", time: "09:45", payMethod: "Efectivo" },
        { id: "BEX-2024-001196", amount: 6300, status: "Pendiente", commune: "La Granja", address: "Santa Rosa 10200", time: "11:20" },
      ] },
    ],
  },
];
