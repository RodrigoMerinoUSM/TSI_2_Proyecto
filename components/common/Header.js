import { Pressable, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function Header({ admin = false, subtitle, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBrand}>
        <View style={styles.miniLogo}>
          <Icon name={admin ? "shield-checkmark" : "time"} size={14} color={C.text} />
        </View>
        <Text style={styles.headerTitle}>{admin ? "Panel Administrador" : "Courier Regist"}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerRoute}>{admin ? "12.345.678-9" : "Ruta R-042"}</Text>
        {onLogout ? (
          <Pressable onPress={onLogout}><Text style={styles.linkSmall}>Cerrar sesión</Text></Pressable>
        ) : subtitle ? <Text style={styles.micro}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
