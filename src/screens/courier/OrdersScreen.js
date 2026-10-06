import { useState } from "react";
import { Text, View } from "react-native";
import { AppScreen, BottomNav, Empty, FilterBar, Header, OrderRow } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, fmt, pending, sum } from "../../utils/reportUtils";

export function OrdersScreen({ orders, onOrder, onTab }) {
  const [filter, setFilter] = useState("todos");
  const waiting = pending(orders);
  const done = delivered(orders);
  const list = filter === "Pendiente" ? waiting : filter === "Entregado" ? done : orders;
  return (
    <AppScreen bottomNav={<BottomNav active="ordenes" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <FilterBar value={filter} onChange={setFilter} items={[
        { value: "Pendiente", label: "Pendientes", count: waiting.length, color: C.amber, icon: "time-outline" },
        { value: "Entregado", label: "Entregados", count: done.length, color: C.green, icon: "checkmark-circle" },
        { value: "todos", label: "Total", count: orders.length, color: C.blue, icon: "cube-outline" },
      ]} />
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Órdenes del día</Text>
        <Text style={[styles.smallBold, { color: C.amber }]}>Saldo pend. {fmt(sum(waiting))}</Text>
      </View>
      <View style={styles.gap8}>
        {list.map((order) => <OrderRow key={order.id} order={order} onPress={() => onOrder(order.id)} />)}
        {!list.length && <Empty text="Sin órdenes en esta categoría" />}
      </View>
    </AppScreen>
  );
}
