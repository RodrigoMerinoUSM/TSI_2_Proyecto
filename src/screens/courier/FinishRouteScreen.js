import { useState } from "react";
import { Text, View } from "react-native";
import { AppScreen, BackButton, Button, Card, Icon, InfoRow, OrderRow, Stat } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { delivered, exportExcel, fmt, pending, reportRows, sum } from "../../utils/reportUtils";

export function FinishRouteScreen({ orders, onBack, onLogout }) {
  const [exported, setExported] = useState(false);
  const [loading, setLoading] = useState(false);
  async function generate() {
    setLoading(true);
    const ok = await exportExcel("Ruta_R-042_10Ene2024.xlsx", reportRows(orders));
    setLoading(false);
    if (ok) setExported(true);
  }
  return (
    <AppScreen>
      <BackButton title="Usuario" onPress={onBack} />
      <Text style={styles.pageTitle}>Terminar Ruta</Text>
      <Text style={styles.mutedBlock}>R-042 · 10 Ene 2024 · Jorge Espinoza</Text>
      <Text style={styles.label}>RESUMEN DE LA RUTA</Text>
      <View style={styles.twoColumns}>
        <Stat value={delivered(orders).length} label="Entregados" color={C.green} icon="checkmark-circle" />
        <Stat value={pending(orders).length} label="No entregados" color={C.red} icon="close-circle" />
      </View>
      <Card>
        <InfoRow label="Total recaudado" value={fmt(sum(delivered(orders)))} />
        <InfoRow label="Saldo sin cobrar" value={fmt(sum(pending(orders)))} color={C.red} />
        <InfoRow label="Total de órdenes" value={String(orders.length)} />
      </Card>
      <Text style={styles.label}>DETALLE DE ÓRDENES</Text>
      <View style={styles.gap8}>{orders.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      <Text style={styles.label}>EXPORTAR REPORTE</Text>
      <Card>
        <View style={styles.sectionTitleRow}><Icon name="document-text" color={C.green} /><View><Text style={styles.rowTitle}>Ruta_R-042_10Ene2024.xlsx</Text><Text style={styles.rowSub}>{orders.length} órdenes · {fmt(sum(delivered(orders)))} recaudado</Text></View></View>
        {exported ? (
          <View style={styles.success}><Icon name="checkmark-circle" color={C.green} /><Text style={[styles.smallBold, { color: C.green }]}>Excel generado correctamente</Text></View>
        ) : (
          <Button title={loading ? "Generando..." : "Generar y compartir Excel"} icon="download" onPress={generate} disabled={loading} kind="secondary" />
        )}
      </Card>
      {!exported && <Text style={styles.lockText}>Debes generar el Excel para poder cerrar sesión.</Text>}
      <Button title="Cerrar sesión y finalizar" icon="log-out-outline" onPress={onLogout} disabled={!exported} kind="danger" />
    </AppScreen>
  );
}
