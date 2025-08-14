import { StyleSheet, Switch, Text, View } from "react-native";
import Lupine from "../../components/Lupine";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";
import { storage } from "../../utils/storage";

export default function Settings() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");

  return (
    <View style={styles.container}>
      <Lupine.FieldSet label="Tracking Mode">
        <Lupine.FormField label="Battery Saving">
          <View
            style={{
              flexDirection: "row",
              gap: 3,
            }}
          >
            <Switch value={true} />
            <Text>Reduce tracking detail to extend battery life</Text>
          </View>
        </Lupine.FormField>
      </Lupine.FieldSet>

      <Lupine.FieldSet label="Global Configuration">
        <Lupine.FormField label="Race">
          {raceConfig ? (
            <Text>{raceConfig.name} </Text>
          ) : (
            <Text>No Race Loaded</Text>
          )}
        </Lupine.FormField>

        <Lupine.FormField label="User ID">
          <Text>{userId}</Text>
        </Lupine.FormField>

        <Lupine.FormField noMargin={true}>
          <Lupine.Button
            onPress={() => {
              storage.clearAll();
            }}
            variant="danger"
            text="Reset Configuration"
          />
        </Lupine.FormField>
      </Lupine.FieldSet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
