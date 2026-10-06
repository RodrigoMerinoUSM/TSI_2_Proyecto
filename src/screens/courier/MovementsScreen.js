import { Text, View } from "react-native";
import { AppScreen, BottomNav, Card, Empty, Header, InfoRow, OrderRow, Stat } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, fmt, pending, sum } from "../../utils/reportUtils";

export function MovementsScreen({ orders, onTab }) {
  const done = delivered(orders);
  const cash = done.filter((order) => order.payMethod === "Efectivo");
  const debit = done.filter((order) => order.payMethod === "Débito");
  const failed = orders.filter((order) => order.status === "No entregado");
  return (
    <AppScreen bottomNav={<BottomNav active="movimientos" onTab={onTab} />}>
      <Header subtitle="Ruta R-042" />
      <Text style={styles.pageTitle}>Movimientos del día</Text>
      <View style={styles.twoColumns}>
        <Stat value={fmt(sum(cash))} label={`${cash.length} en efectivo`} color={C.amber} icon="cash-outline" />
        <Stat value={fmt(sum(debit))} label={`${debit.length} con débito`} color={C.blue} icon="card-outline" />
      </View>
      <Card>
        <InfoRow label="Total recaudado hoy" value={fmt(sum(done))} />
        <InfoRow label="Saldo pendiente" value={fmt(sum(pending(orders)))} color={C.amber} />
      </Card>
      <Text style={styles.label}>ENTREGAS REGISTRADAS</Text>
      <View style={styles.gap8}>
        {done.map((item) => <OrderRow key={item.id} order={item} />)}
        {!done.length && <Empty text="Sin entregas registradas aún" />}
      </View>
      {!!failed.length && <>
        <Text style={styles.label}>NO ENTREGADOS</Text>
        <View style={styles.gap8}>{failed.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </>}
    </AppScreen>
  );
}
