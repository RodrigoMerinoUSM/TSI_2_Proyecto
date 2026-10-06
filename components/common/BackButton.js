import { Pressable, Text } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function BackButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.back}>
      <Icon name="chevron-back" size={20} color={C.muted} />
      <Text style={styles.backText}>{title}</Text>
    </Pressable>
  );
}
