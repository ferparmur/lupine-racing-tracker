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
import { RaceConfig } from "../types/raceConfig";

export default function Home() {
  const [apiEndpoint, setApiEndpoint] = useState<string>(
    "https://lupine.fparedes.com/submit.php",
  );
  const [raceConfig, setRaceConfig] = useState<RaceConfig | undefined>(
    undefined,
  );
  const [userToken, setUserToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const raceConfig = await getFromStorage("raceConfig");
      if (raceConfig) {
        setRaceConfig(raceConfig);
      } else {
        try {
          const response = await fetch(
            "https://lupine.fparedes.com/assets/race.json",
          ); // remote JSON URL
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setRaceConfig(json);
        } catch (err) {
          console.log(err);
        }
      }

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
      <View>
        <Text>{JSON.stringify(raceConfig)}</Text>
      </View>

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
        style={[styles.formField, styles.button]}
        onPress={async () => {
          try {
            const response = await fetch(
              "https://lupine.fparedes.com/assets/race.json",
            ); // remote JSON URL
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
          } catch (err) {
            console.log(err);
          } finally {
          }
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Fetch Race Config</Text>
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
