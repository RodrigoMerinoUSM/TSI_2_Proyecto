import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { AppScreen, Button, Card, Field, Icon } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";

export function LoginScreen({ onLogin, onAdmin }) {
  const [route, setRoute] = useState("R-042");
  const [rut, setRut] = useState("12.345.678-9");
  return (
    <AppScreen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.login}>
        <View style={styles.logo}><Icon name="layers" size={34} color={C.text} /></View>
        <Text style={styles.loginTitle}>Courier <Text style={{ color: C.blue }}>Regist</Text></Text>
        <Text style={styles.loginSubtitle}>Sistema de registro de encomiendas</Text>
        <Card style={styles.loginCard}>
          <View style={styles.sectionTitleRow}>
            <Icon name="car-outline" color={C.blue} />
            <Text style={styles.sectionTitle}>Acceso Repartidor</Text>
          </View>
          <Field label="NÚMERO DE RUTA" value={route} onChangeText={setRoute} placeholder="Ej: R-042" />
          <Field label="RUT" value={rut} onChangeText={setRut} placeholder="12.345.678-9" />
          <Button title="Ingresar" icon="arrow-forward" onPress={onLogin} />
        </Card>
        <Pressable onPress={onAdmin} style={styles.adminAccess}>
          <Icon name="add-circle-outline" size={16} />
          <Text style={styles.muted}>Ingresar como Administrador</Text>
        </Pressable>
        <Text style={styles.version}>Courier Regist · v2.1.0</Text>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}
