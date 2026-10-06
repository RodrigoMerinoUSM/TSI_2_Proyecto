import { Pressable, Text, View } from "react-native";
import { Icon } from "../common";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { delivered, fmt, pending, sum } from "../../src/utils/reportUtils";

export function AdminHistoryRouteList({ routes, onPress }) {
  return (
    <View style={styles.gap10}>
      {routes.map((route) => {
        const done = delivered(route.packages);
        const notDelivered = pending(route.packages);
        const percentage = route.packages.length ? Math.round((done.length / route.packages.length) * 100) : 0;
        const progressColor = percentage === 100 ? C.green : C.blue;
        return (
          <Pressable
            accessibilityRole="button"
            key={route.route}
            onPress={() => onPress(route.route)}
            style={({ pressed }) => [styles.card, styles.historyRouteCard, pressed && styles.pressed]}
          >
            <View style={styles.rowBetween}>
              <View style={styles.routeInfo}>
                <View style={styles.routeIcon}><Icon name="car-outline" color={C.blue} /></View>
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>Ruta {route.route}</Text>
                  <Text style={styles.rowSub} numberOfLines={1}>{route.repartidor}</Text>
                </View>
              </View>
              <View style={styles.alignEnd}>
                <Text style={styles.amount}>{fmt(sum(route.packages))}</Text>
                <Text style={styles.micro}>{route.packages.length} paquetes</Text>
              </View>
            </View>
            <View style={styles.historyRouteProgressRow}>
              <View style={styles.historyRouteProgressTrack}>
                <View style={[styles.historyRouteProgressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
              </View>
              <Text style={[styles.historyRoutePercentage, { color: progressColor }]}>{percentage}%</Text>
            </View>
            <View style={styles.historyRouteFooter}>
              <View style={styles.historyDayStats}>
                <Text style={styles.historyDelivered}>✓ {done.length} entregados</Text>
                {!!notDelivered.length && <Text style={styles.historyFailed}>× {notDelivered.length} no entregados</Text>}
              </View>
              <Icon name="chevron-forward" size={16} color={C.dim} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
