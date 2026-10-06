import { Ionicons } from "@expo/vector-icons";
import { C } from "../../src/theme/colors";

export function Icon({ name, size = 20, color = C.muted }) {
  return <Ionicons name={name} size={size} color={color} />;
}
