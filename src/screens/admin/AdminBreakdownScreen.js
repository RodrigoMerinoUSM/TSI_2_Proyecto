import { Text, View } from "react-native";
import { AppScreen, BottomNav, Card, Header, InfoMini, Progress } from "../../../components/common";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";
import { fmt } from "../../utils/reportUtils";

export function AdminBreakdownScreen({ onTab, onLogout }) {
  const days = [
    { label: "Hoy", date: "10 Ene", cash: 8750, debit: 0 },
    { label: "Ayer", date: "09 Ene", cash: 28000, debit: 24480 },
    { label: "Hace 2 días", date: "08 Ene", cash: 12300, debit: 17800 },
    { label: "Hace 3 días", date: "07 Ene", cash: 23700, debit: 9800 },
  ];
  return (
    <AppScreen bottomNav={<BottomNav admin active="desglose" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <Text style={styles.pageTitle}>Desglose por método de pago</Text>
      <View style={styles.gap10}>
        {days.map((day) => {
          const total = day.cash + day.debit;
          const pct = total ? Math.round((day.cash / total) * 100) : 0;
          return (
            <Card key={day.label}>
              <View style={styles.rowBetween}><Text style={styles.rowTitle}>{day.label} <Text style={styles.micro}>{day.date}</Text></Text><Text style={styles.amount}>{fmt(total)}</Text></View>
              <Progress value={pct} color={C.green} />
              <View style={styles.twoColumns}>
                <InfoMini label={`Efectivo ${pct}%`} value={fmt(day.cash)} />
                <InfoMini label={`Débito ${100 - pct}%`} value={fmt(day.debit)} />
              </View>
            </Card>
          );
        })}
      </View>
    </AppScreen>
  );
}
