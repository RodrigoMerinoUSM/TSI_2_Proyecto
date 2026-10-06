import { Pressable, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function ChoiceGrid({ value, onChange, items }) {
  return (
    <View style={styles.twoColumns}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <Pressable key={item.value} onPress={() => onChange(item.value)} style={[styles.choice, active && { borderColor: item.color, backgroundColor: `${item.color}16` }]}>
            <Icon name={item.icon} size={30} color={active ? item.color : C.dim} />
            <Text style={[styles.smallBold, { color: active ? item.color : C.muted }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
