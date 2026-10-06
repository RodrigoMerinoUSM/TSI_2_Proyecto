import { Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";

export function InfoRow({ label, value, color = C.text }) {
  return <View style={styles.infoRow}><Text style={styles.muted}>{label}</Text><Text style={[styles.smallBold, { color }]}>{value}</Text></View>;
}
