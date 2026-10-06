import { Switch, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Card } from "./Card";

export function Setting({ label, sub, value, onChange }) {
  return (
    <Card style={styles.setting}>
      <View style={styles.flex}><Text style={styles.rowTitle}>{label}</Text><Text style={styles.rowSub}>{sub}</Text></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: C.line, true: C.blueDark }} thumbColor={C.text} />
    </Card>
  );
}
