import { Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";

export function InfoMini({ label, value }) {
  return <View style={styles.infoMini}><Text style={styles.micro}>{label}</Text><Text style={styles.smallBold}>{value}</Text></View>;
}
