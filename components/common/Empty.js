import { Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function Empty({ text }) {
  return <View style={styles.empty}><Icon name="cube-outline" size={34} color={C.dim} /><Text style={styles.muted}>{text}</Text></View>;
}
