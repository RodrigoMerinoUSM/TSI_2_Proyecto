import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../src/styles/appStyles";

export function AppScreen({ children, scroll = true, bottomNav }) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, bottomNav && styles.contentWithNav]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.flex}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="light" />
      {content}
      {bottomNav}
    </SafeAreaView>
  );
}
