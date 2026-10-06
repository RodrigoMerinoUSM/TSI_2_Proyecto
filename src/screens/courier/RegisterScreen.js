import { useState } from "react";
import { Text, View } from "react-native";
import { AppScreen, BackButton, Button, Card, ChoiceGrid, Icon, InfoMini } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { fmt } from "../../utils/reportUtils";

export function RegisterScreen({ order, onBack, onConfirm }) {
  const [status, setStatus] = useState(order.status === "No entregado" ? "No entregado" : "Entregado");
  const [payment, setPayment] = useState(order.payMethod || "Efectivo");
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <AppScreen>
        <View style={styles.confirmed}>
          <View style={[styles.confirmIcon, { borderColor: status === "Entregado" ? C.green : C.red }]}>
            <Icon name={status === "Entregado" ? "checkmark" : "close"} size={42} color={status === "Entregado" ? C.green : C.red} />
          </View>
          <Text style={styles.loginTitle}>{status === "Entregado" ? "Entrega registrada" : "Orden sin entregar"}</Text>
          <Text style={styles.mutedBlock}>{order.id}</Text>
          <Button title="Volver a Órdenes" onPress={onBack} style={styles.fullWidth} />
        </View>
      </AppScreen>
    );
  }
  return (
    <AppScreen>
      <BackButton title="Registrar Entrega" onPress={onBack} />
      <Card style={styles.highlightCard}>
        <Text style={styles.label}>ORDEN DE ENCOMIENDA</Text>
        <Text style={[styles.pageTitle, { color: C.blue }]}>{order.id}</Text>
        <View style={styles.twoColumns}>
          <InfoMini label="Saldo a cobrar" value={fmt(order.amount)} />
          <InfoMini label="Comuna" value={order.commune} />
        </View>
      </Card>
      <Text style={styles.stepTitle}>1  Estado de la entrega</Text>
      <ChoiceGrid value={status} onChange={setStatus} items={[
        { value: "Entregado", label: "Entregado", icon: "checkmark-circle", color: C.green },
        { value: "No entregado", label: "No entregado", icon: "close-circle", color: C.red },
      ]} />
      {status === "Entregado" && <>
        <Text style={styles.stepTitle}>2  Método de pago</Text>
        <ChoiceGrid value={payment} onChange={setPayment} items={[
          { value: "Efectivo", label: "Efectivo", icon: "cash-outline", color: C.amber },
          { value: "Débito", label: "Débito", icon: "card-outline", color: C.blue },
        ]} />
      </>}
      <Button
        title="Confirmar Registro"
        icon="checkmark"
        style={styles.marginTop16}
        onPress={() => {
          onConfirm(order.id, status, payment);
          setConfirmed(true);
        }}
      />
    </AppScreen>
  );
}
