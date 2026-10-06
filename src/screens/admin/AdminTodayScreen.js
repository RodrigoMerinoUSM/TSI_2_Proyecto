import { useState } from "react";
import { Text, View } from "react-native";
import { RouteList } from "../../../components/admin";
import { AppScreen, BackButton, BottomNav, Empty, FilterBar, Header, OrderRow, Search, Stat } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, fmt, pending, sum } from "../../utils/reportUtils";

export function AdminTodayScreen({ routes, onTab, onLogout }) {
  const [query, setQuery] = useState("");
  const [routeId, setRouteId] = useState(null);
  const [filter, setFilter] = useState("todos");
  const route = routes.find((item) => item.route === routeId);
  if (route) {
    const list = filter === "todos" ? route.packages : filter === "Pendiente" ? pending(route.packages) : delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="hoy" onTab={onTab} />}>
        <BackButton title="Hoy" onPress={() => { setRouteId(null); setFilter("todos"); }} />
        <View style={styles.rowBetween}>
          <View style={styles.flex}><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.repartidor}</Text></View>
          <Text style={styles.amount}>{fmt(sum(delivered(route.packages)))}</Text>
        </View>
        <FilterBar value={filter} onChange={setFilter} items={[
          { value: "Pendiente", label: "No entregados", count: pending(route.packages).length, color: C.red, icon: "alert-circle-outline" },
          { value: "Entregado", label: "Entregados", count: delivered(route.packages).length, color: C.green, icon: "checkmark-circle" },
          { value: "todos", label: "Total", count: route.packages.length, color: C.blue, icon: "cube-outline" },
        ]} />
        <View style={styles.gap8}>{list.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </AppScreen>
    );
  }
  const normalized = query.toLowerCase();
  const filtered = routes.filter((item) => !normalized || item.route.toLowerCase().includes(normalized) || item.repartidor.toLowerCase().includes(normalized));
  const all = routes.flatMap((item) => item.packages);
  return (
    <AppScreen bottomNav={<BottomNav admin active="hoy" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <View style={styles.twoColumns}>
        <Stat value={all.length} label={`${delivered(all).length} entregadas`} icon="cube-outline" />
        <Stat value={fmt(sum(delivered(all)))} label="Recaudación hoy" color={C.blue} icon="wallet-outline" />
      </View>
      <Text style={styles.pageTitle}>Rutas activas hoy</Text>
      <Text style={styles.mutedBlock}>Presiona una ruta para ver sus paquetes</Text>
      <Search value={query} onChangeText={setQuery} placeholder="Buscar ruta o repartidor..." />
      <RouteList routes={filtered} onPress={setRouteId} />
      {!filtered.length && <Empty text={`Sin resultados para "${query}"`} />}
    </AppScreen>
  );
}
