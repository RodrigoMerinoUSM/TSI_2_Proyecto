import { View } from "react-native";
import { styles } from "../../src/styles/appStyles";

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
