import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import BackgroundGeoLocationIntegration from "../components/BackgroundGeoLocationIntegration/BackgroundGeoLocationIntegration";

export default function Home() {
  const [apiEndpoint, setApiEndpoint] = useState<string>(
    "https://lupine.fparedes.com/submit.php",
  );
  const [userToken, setUserToken] = useState<string>("");

  const [isEditing, setIsEditing] = useState(true);

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

      setIsEditing(apiEndpoint && userToken);
    };

    fetchInitialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.inputLabel}>Remote API:</Text>
        <TextInput
          editable={isEditing}
          value={apiEndpoint}
          onChangeText={(value) => {
            setApiEndpoint(value);
            saveToStorage("apiToken", value);
          }}
          style={[
            styles.textInput,
            isEditing ? undefined : styles.textInputDisabled,
          ]}
          inputMode="url"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.inputLabel}>User Token:</Text>
        <TextInput
          editable={isEditing}
          placeholder="Eg.: abc1234"
          value={userToken}
          onChangeText={(value) => {
            setUserToken(value);
            saveToStorage("userToken", value);
          }}
          style={[
            styles.textInput,
            isEditing ? undefined : styles.textInputDisabled,
          ]}
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.formField]}>
        {isEditing ? (
          <TouchableOpacity
            style={[
              styles.button,
              !userToken || !apiEndpoint ? styles.buttonDisabled : undefined,
            ]}
            onPress={() => setIsEditing(false)}
            disabled={!userToken || !apiEndpoint}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.formField,
          styles.button,
          (!userToken || !apiEndpoint) && styles.buttonDisabled,
        ]}
        onPress={async () => {
          try {
            const response = await fetch(apiEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userToken, location: "lololo" }),
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseBody = await response.text();
            Alert.alert("Success", responseBody);
          } catch (error) {
            const err = error as Error;
            Alert.alert("Error", err.message || "Failed to send token");
          }
        }}
        disabled={!userToken || !apiEndpoint}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Send Token</Text>
      </TouchableOpacity>

      {!isEditing && apiEndpoint && userToken ? (
        <BackgroundGeoLocationIntegration
          userToken={userToken}
          apiEndpoint={apiEndpoint}
        />
      ) : (
        <Text>
          Please configure your User Token to start recording your location.
        </Text>
      )}
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

  textInputDisabled: {
    opacity: 0.5,
  },

  button: {
    backgroundColor: theme.colors.black800,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
