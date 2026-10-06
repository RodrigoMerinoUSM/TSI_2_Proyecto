import { Pressable, TextInput, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";
import { Icon } from "./Icon";

export function Search({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.search}>
      <Icon name="search" size={16} color={C.dim} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.dim}
        style={styles.searchInput}
      />
      {!!value && (
        <Pressable onPress={() => onChangeText("")}>
          <Icon name="close-circle" size={17} color={C.dim} />
        </Pressable>
      )}
    </View>
  );
}
