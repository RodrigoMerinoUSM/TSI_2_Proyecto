import { Pressable, Text, View } from "react-native";
import { Icon, Progress } from "../common";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { delivered, fmt, sum } from "../../src/utils/reportUtils";

export function RouteList({ routes, onPress }) {
  return (
    <View style={styles.gap10}>
      {routes.map((route) => {
        const done = delivered(route.packages);
        const pct = Math.round((done.length / route.packages.length) * 100);
        return (
          <Pressable key={route.route} onPress={() => onPress(route.route)} style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.routeInfo}><View style={styles.routeIcon}><Icon name="car-outline" color={C.blue} /></View><View><Text style={styles.rowTitle}>Ruta {route.route}</Text><Text style={styles.rowSub} numberOfLines={1}>{route.repartidor}</Text></View></View>
              <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(done))}</Text><Text style={styles.micro}>{route.packages.length} paquetes</Text></View>
            </View>
            <Progress value={pct} color={pct === 100 ? C.green : C.blue} />
            <Text style={styles.micro}>{done.length} entregados · {route.packages.length - done.length} no entregados</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
