import { Pressable, Text } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function Button({ title, onPress, kind = "primary", disabled = false, icon, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        kind === "secondary" && styles.buttonSecondary,
        kind === "danger" && styles.buttonDanger,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {icon && <Icon name={icon} size={17} color={disabled ? C.dim : C.text} />}
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
    </Pressable>
  );
}
