import { Pressable, Text, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function FilterBar({ value, onChange, items }) {
  return (
    <View style={styles.filterRow}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            style={[styles.filter, active && { borderColor: item.color || C.blue, backgroundColor: `${item.color || C.blue}20` }]}
          >
            {item.count !== undefined && (
              <View style={styles.filterCountRow}>
                {item.icon && <Icon name={item.icon} size={15} color={active ? item.color || C.blue : C.muted} />}
                <Text style={styles.filterCount}>{item.count}</Text>
              </View>
            )}
            <Text style={[styles.filterText, active && styles.filterTextActive]} numberOfLines={1}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
