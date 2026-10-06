import { Pressable, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function BottomNav({ active, onTab, admin = false }) {
  const tabs = admin
    ? [
      ["hoy", "Hoy", "cube-outline"],
      ["historial", "Historial", "time-outline"],
      ["desglose", "Desglose", "bar-chart-outline"],
      ["config", "Config.", "settings-outline"],
    ]
    : [
      ["ordenes", "Órdenes", "cube-outline"],
      ["historial", "Historial", "time-outline"],
      ["movimientos", "Movimientos", "swap-vertical-outline"],
      ["usuario", "Usuario", "person-outline"],
    ];
  return (
    <View style={styles.bottomNav}>
      {tabs.map(([id, label, icon]) => (
        <Pressable key={id} onPress={() => onTab(id)} style={styles.navItem}>
          <Icon name={icon} size={22} color={active === id ? C.blue : C.dim} />
          <Text style={[styles.navLabel, active === id && styles.navLabelActive]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
