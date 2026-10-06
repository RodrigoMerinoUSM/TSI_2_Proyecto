import { Text, View } from "react-native";
import { AppScreen, BottomNav, Button, Card, Header, Icon, InfoRow } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";

export function UserScreen({ onTab, onFinish }) {
  return (
    <AppScreen bottomNav={<BottomNav active="usuario" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <View style={styles.profile}>
        <View style={styles.avatar}><Icon name="person" size={38} color={C.text} /></View>
        <Text style={styles.pageTitle}>Jorge Espinoza Ramos</Text>
        <Text style={styles.muted}>RUT: 12.345.678-9</Text>
        <View style={styles.routePill}><Text style={styles.linkSmall}>Ruta R-042</Text></View>
      </View>
      <Card>
        <InfoRow label="Ruta asignada" value="R-042" />
        <InfoRow label="Fecha de ingreso" value="01 Mar 2023" />
        <InfoRow label="Entregas totales" value="1.247" />
        <InfoRow label="Calificación" value="4.9 / 5" />
      </Card>
      <Button title="Terminar ruta" icon="checkmark-done" onPress={onFinish} style={styles.marginTop16} />
    </AppScreen>
  );
}
