import { Pressable, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { fmt } from "../../src/utils/reportUtils";
import { Card } from "./Card";
import { StatusBadge } from "./StatusBadge";

export function OrderRow({ order, onPress }) {
  const body = (
    <View style={styles.rowBetween}>
      <View style={styles.flex}>
        <StatusBadge status={order.status} />
        <Text style={styles.rowTitle}>{order.id}</Text>
        <Text style={styles.rowSub}>{order.commune}{order.time ? ` · ${order.time}` : ""}</Text>
      </View>
      <View style={styles.alignEnd}>
        <Text style={styles.amount}>{fmt(order.amount)}</Text>
        {onPress && <Text style={styles.linkSmall}>{order.status === "Entregado" ? "Cambiar" : "Registrar"}</Text>}
      </View>
    </View>
  );
  return onPress ? <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>{body}</Pressable> : <Card>{body}</Card>;
}
