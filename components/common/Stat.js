import { Text } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Card } from "./Card";
import { Icon } from "./Icon";

export function Stat({ value, label, color = C.text, icon }) {
  return (
    <Card style={styles.stat}>
      {icon && <Icon name={icon} size={18} color={color} />}
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.micro}>{label}</Text>
    </Card>
  );
}
