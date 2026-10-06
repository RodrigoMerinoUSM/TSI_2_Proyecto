import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { AppScreen, BackButton, Button, Card, Field, Icon } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";

export function AdminLoginScreen({ onBack, onLogin }) {
  const [rut, setRut] = useState("12.345.678-9");
  const [password, setPassword] = useState("administrador");
  const [visible, setVisible] = useState(false);
  return (
    <AppScreen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <BackButton title="Volver" onPress={onBack} />
        <View style={styles.login}>
          <View style={[styles.logo, styles.adminLogo]}><Icon name="shield-checkmark" size={34} color={C.blue} /></View>
          <Text style={styles.loginTitle}>Acceso Administrador</Text>
          <Text style={styles.loginSubtitle}>Jefe de Operaciones</Text>
          <Card style={styles.loginCard}>
            <Field label="RUT ADMINISTRADOR" value={rut} onChangeText={setRut} />
            <Field
              label="CONTRASEÑA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visible}
              right={<Pressable onPress={() => setVisible(!visible)}><Icon name={visible ? "eye-off" : "eye"} /></Pressable>}
            />
            <Button title="Ingresar al Panel" icon="arrow-forward" onPress={onLogin} />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}
