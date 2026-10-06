import { useMemo, useState } from "react";
import { INITIAL_ORDERS, OTHER_TODAY_ROUTES } from "../data";
import { AdminBreakdownScreen, AdminConfigScreen, AdminHistoryScreen, AdminTodayScreen } from "../screens/admin";
import { AdminLoginScreen, LoginScreen } from "../screens/auth";
import { FinishRouteScreen, HistoryScreen, MovementsScreen, OrdersScreen, RegisterScreen, RouteFinishedScreen, UserScreen } from "../screens/courier";

export function BlueExpressApp() {
  const [screen, setScreen] = useState("login");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const todayRoutes = useMemo(() => [
    { route: "R-042", repartidor: "Jorge Espinoza Ramos", packages: orders },
    ...OTHER_TODAY_ROUTES,
  ], [orders]);

  function logout() {
    setOrders(INITIAL_ORDERS);
    setSelectedOrderId("");
    setScreen("login");
  }

  function finishRoute() {
    setOrders(INITIAL_ORDERS);
    setSelectedOrderId("");
    setScreen("ruta-finalizada");
  }

  function register(id, status, payment) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setOrders((current) => current.map((order) => order.id === id ? {
      ...order,
      status,
      payMethod: status === "Entregado" ? payment : undefined,
      time,
    } : order));
  }

  const courierTab = (tab) => setScreen(tab);
  const adminTab = (tab) => setScreen(`admin-${tab}`);
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0];

  if (screen === "login") return <LoginScreen onLogin={() => setScreen("ordenes")} onAdmin={() => setScreen("login-admin")} />;
  if (screen === "login-admin") return <AdminLoginScreen onBack={() => setScreen("login")} onLogin={() => setScreen("admin-hoy")} />;
  if (screen === "ordenes") return <OrdersScreen orders={orders} onTab={courierTab} onOrder={(id) => { setSelectedOrderId(id); setScreen("registrar"); }} />;
  if (screen === "registrar") return <RegisterScreen order={selectedOrder} onBack={() => setScreen("ordenes")} onConfirm={register} />;
  if (screen === "historial") return <HistoryScreen onTab={courierTab} />;
  if (screen === "movimientos") return <MovementsScreen orders={orders} onTab={courierTab} />;
  if (screen === "usuario") return <UserScreen onTab={courierTab} onFinish={() => setScreen("terminar-ruta")} />;
  if (screen === "terminar-ruta") return <FinishRouteScreen orders={orders} onBack={() => setScreen("usuario")} onLogout={finishRoute} />;
  if (screen === "ruta-finalizada") return <RouteFinishedScreen onLogin={logout} />;
  if (screen === "admin-hoy") return <AdminTodayScreen routes={todayRoutes} onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-historial") return <AdminHistoryScreen onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-desglose") return <AdminBreakdownScreen onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-config") return <AdminConfigScreen onTab={adminTab} onLogout={logout} />;
  return null;
}
