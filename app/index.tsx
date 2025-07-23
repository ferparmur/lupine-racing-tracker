import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../src/theme";
import { useState } from "react";

export default function Home() {
  const [apiEndpoint, setApiEndpoint] = useState<string>(
    "https://lupine.fparedes.com/submit/",
  );
  const [userId, setUserId] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.inputLabel}>Remote API:</Text>
        <TextInput
          value={apiEndpoint}
          onChangeText={setApiEndpoint}
          style={styles.textInput}
          inputMode="url"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.inputLabel}>User Identifier:</Text>
        <TextInput
          placeholder="Eg.: abc1234"
          value={userId}
          onChangeText={setUserId}
          style={styles.textInput}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },

  formField: {
    marginBlockEnd: 24,
  },

  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
  },

  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.black800,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
});
