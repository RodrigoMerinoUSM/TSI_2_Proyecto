import { Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";

export function StatusBadge({ status }) {
  const color = status === "Entregado" ? C.green : status === "No entregado" ? C.red : C.amber;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  );
}
