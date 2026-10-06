import { SafeAreaProvider } from "react-native-safe-area-context";
import { BlueExpressApp } from "./src/app/BlueExpressApp";

export default function App() {
  return (
    <SafeAreaProvider>
      <BlueExpressApp />
    </SafeAreaProvider>
  );
}
