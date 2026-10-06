import { View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";

export function Progress({ value, color = C.blue }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressBar, { width: `${Math.min(100, value)}%`, backgroundColor: color }]} />
    </View>
  );
}
