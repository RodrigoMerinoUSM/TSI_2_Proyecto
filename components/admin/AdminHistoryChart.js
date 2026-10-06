import { Text, View } from "react-native";
import { Card } from "../common";
import { ADMIN_HISTORY } from "../../src/data";
import { styles } from "../../src/styles/appStyles";
import { delivered, sum } from "../../src/utils/reportUtils";

export function AdminHistoryChart() {
  const days = [...ADMIN_HISTORY].reverse().map((item) => {
    const packages = item.routes.flatMap((routeItem) => routeItem.packages);
    const total = sum(packages);
    const collected = sum(delivered(packages));
    return {
      label: item.label === "Hace 3 días" ? "3 días" : item.label === "Hace 2 días" ? "2 días" : item.label,
      total,
      percentage: total ? Math.round((collected / total) * 100) : 0,
    };
  });
  const maxTotal = Math.max(...days.map((day) => day.total), 1);

  return (
    <Card style={styles.historyChart}>
      <Text style={styles.historyChartTitle}>Recaudación comparada</Text>
      <View style={styles.historyBars}>
        {days.map((day, index) => (
          <View key={day.label} style={styles.historyBarColumn}>
            <Text style={styles.historyBarValue}>{day.percentage}%</Text>
            <View
              style={[
                styles.historyBar,
                index === days.length - 1 && styles.historyBarLatest,
                { height: Math.max(24, Math.round((day.total / maxTotal) * 58)) },
              ]}
            />
            <Text style={styles.historyBarLabel}>{day.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
