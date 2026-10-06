import { Text, TextInput, View } from "react-native";
import { styles } from "../../src/styles/appStyles";
import { C } from "../../src/theme/colors";

export function Field({ label, value, onChangeText, placeholder, secureTextEntry, right }) {
  return (
    <View style={styles.fieldWrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.fieldRow}>
        <TextInput
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={C.dim}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, right && styles.inputWithRight]}
        />
        {right && <View style={styles.inputRight}>{right}</View>}
      </View>
    </View>
  );
}
