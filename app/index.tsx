import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

export default function Home() {
  const [apiEndpoint, setApiEndpoint] = useState<string>(
    "https://lupine.fparedes.com/submit/",
  );
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const apiEndpoint = await getFromStorage("apiEndpoint");
      if (apiEndpoint) {
        setApiEndpoint(apiEndpoint);
      }

      const userToken = await getFromStorage("userToken");
      if (userToken) {
        setUserToken(userToken);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.inputLabel}>Remote API:</Text>
        <TextInput
          value={apiEndpoint}
          onChangeText={(value) => {
            setApiEndpoint(value);
            saveToStorage("apiToken", value);
          }}
          style={styles.textInput}
          inputMode="url"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.inputLabel}>User Token:</Text>
        <TextInput
          placeholder="Eg.: abc1234"
          value={userToken}
          onChangeText={(value) => {
            setUserToken(value);
            saveToStorage("userToken", value);
          }}
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
