import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AdminHistoryChart, AdminHistoryRouteList } from "../../../components/admin";
import { AppScreen, BackButton, BottomNav, Empty, FilterBar, Header, Icon, OrderRow, Search } from "../../../components/common";
import { ADMIN_HISTORY } from "../../data";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, exportExcel, fmt, pending, reportRows, sum } from "../../utils/reportUtils";

export function AdminHistoryScreen({ onTab, onLogout }) {
  const [dayLabel, setDayLabel] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todos");
  const day = ADMIN_HISTORY.find((item) => item.label === dayLabel);
  const route = day?.routes.find((item) => item.route === routeId);
  if (day && route) {
    const list = filter === "todos" ? route.packages : filter === "Pendiente" ? pending(route.packages) : delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
        <BackButton title={day.label} onPress={() => { setRouteId(null); setFilter("todos"); }} />
        <View style={styles.rowBetween}>
          <View><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.repartidor} · {day.date}</Text></View>
          <Pressable style={styles.exportIcon} onPress={() => exportExcel(`Ruta_${route.route}_${day.date.replaceAll(" ", "_")}.xlsx`, reportRows(route.packages))}>
            <Icon name="download" color={C.green} /><Text style={[styles.micro, { color: C.green }]}>Excel</Text>
          </Pressable>
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
  if (day) {
    const normalized = query.toLowerCase();
    const routes = day.routes.filter((item) => !normalized || item.route.toLowerCase().includes(normalized) || item.repartidor.toLowerCase().includes(normalized));
    const all = day.routes.flatMap((item) => item.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
        <BackButton title="Historial" onPress={() => { setDayLabel(null); setQuery(""); }} />
        <View style={styles.historySelectedDayHeader}>
          <View><Text style={styles.pageTitle}>{day.label}</Text><Text style={styles.muted}>{day.date}</Text></View>
          <View style={styles.historySelectedDayActions}>
            <View style={styles.alignEnd}><Text style={styles.historySelectedDayTotal}>{fmt(sum(all))}</Text><Text style={styles.micro}>total recaudado</Text></View>
            <Pressable accessibilityRole="button" style={styles.exportIcon} onPress={() => exportExcel(`Historial_${day.date.replaceAll(" ", "_")}.xlsx`, reportRows(all))}>
              <Icon name="download" color={C.green} /><Text style={[styles.micro, { color: C.green }]}>Excel</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.historyRouteHint}>Presiona una ruta para ver sus paquetes</Text>
        <Search value={query} onChangeText={setQuery} placeholder="Buscar ruta o repartidor..." />
        <AdminHistoryRouteList routes={routes} onPress={setRouteId} />
        {!routes.length && <Empty text={`Sin resultados para "${query}"`} />}
      </AppScreen>
    );
  }
  return (
    <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <Text style={styles.pageTitle}>Historial global</Text>
      <Text style={styles.mutedBlock}>Todas las rutas del servidor · últimos 3 días</Text>
      <AdminHistoryChart />
      <View style={styles.gap10}>
        {ADMIN_HISTORY.map((item) => {
          const all = item.routes.flatMap((routeItem) => routeItem.packages);
          const done = delivered(all);
          const notDelivered = pending(all);
          return (
            <Pressable
              accessibilityRole="button"
              key={item.label}
              onPress={() => setDayLabel(item.label)}
              style={({ pressed }) => [styles.card, styles.historyDayCard, pressed && styles.pressed]}
            >
              <View style={styles.rowBetween}>
                <View><Text style={styles.rowTitle}>{item.label}</Text><Text style={styles.rowSub}>{item.date} · {item.routes.length} rutas</Text></View>
                <View style={styles.historyDayAmount}>
                  <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(all))}</Text><Text style={styles.micro}>{all.length} paquetes</Text></View>
                  <Icon name="chevron-forward" size={17} color={C.dim} />
                </View>
              </View>
              <View style={styles.historyDayStats}>
                <Text style={styles.historyDelivered}>✓ {done.length} entregados</Text>
                <Text style={styles.historyFailed}>× {notDelivered.length} no entregados</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </AppScreen>
  );
}
