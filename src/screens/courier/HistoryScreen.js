import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AppScreen, BackButton, BottomNav, Header, Icon, OrderRow, Progress, StatusBadge } from "../../../components/common";
import { ROUTE_HISTORY } from "../../data";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, fmt, sum } from "../../utils/reportUtils";

export function HistoryScreen({ onTab }) {
  const [routeId, setRouteId] = useState(null);
  const route = ROUTE_HISTORY.find((item) => item.route === routeId);
  if (route) {
    const done = delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav active="historial" onTab={onTab} />}>
        <BackButton title="Historial" onPress={() => setRouteId(null)} />
        <View style={styles.rowBetween}>
          <View><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.date} · {route.repartidor}</Text></View>
          <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(done))}</Text><Text style={styles.micro}>recaudado</Text></View>
        </View>
        <View style={styles.pills}>
          <StatusBadge status={`${done.length} entregados`} />
          <StatusBadge status={`${route.packages.length - done.length} no entregados`} />
        </View>
        <Text style={styles.label}>{route.packages.length} PAQUETES EN ESTA RUTA</Text>
        <View style={styles.gap8}>{route.packages.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </AppScreen>
    );
  }
  return (
    <AppScreen bottomNav={<BottomNav active="historial" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <Text style={styles.pageTitle}>Historial por ruta</Text>
      <Text style={styles.mutedBlock}>Selecciona una ruta para ver sus paquetes</Text>
      <View style={styles.gap10}>
        {ROUTE_HISTORY.map((item) => {
          const done = delivered(item.packages);
          const pct = Math.round((done.length / item.packages.length) * 100);
          return (
            <Pressable key={item.route} onPress={() => setRouteId(item.route)} style={styles.card}>
              <View style={styles.rowBetween}>
                <View><Text style={styles.rowTitle}>Ruta {item.route}</Text><Text style={styles.rowSub}>{item.date} · {item.repartidor}</Text></View>
                <Icon name="chevron-forward" />
              </View>
              <Progress value={pct} color={pct === 100 ? C.green : C.blue} />
              <Text style={styles.micro}>{done.length} entregados · {item.packages.length - done.length} no entregados</Text>
            </Pressable>
          );
        })}
      </View>
    </AppScreen>
  );
}
