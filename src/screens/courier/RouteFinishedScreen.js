import { Text, View } from "react-native";
import { AppScreen, Button, Icon } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";

export function RouteFinishedScreen({ onLogin }) {
  return (
    <AppScreen scroll={false}>
      <View style={styles.confirmed}>
        <View style={[styles.confirmIcon, { borderColor: C.green }]}>
          <Icon name="checkmark" size={42} color={C.green} />
        </View>
        <Text style={styles.loginTitle}>Ruta finalizada</Text>
        <Text style={styles.mutedBlock}>La sesión del repartidor se cerró correctamente.</Text>
        <Button
          title="Volver al inicio de sesión"
          icon="log-in-outline"
          onPress={onLogin}
          style={styles.fullWidth}
        />
      </View>
    </AppScreen>
  );
}
