import { StyleSheet, Text, View } from "react-native";
import Lupine from "../../components/Lupine";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";

export default function Settings() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");

  return (
    <View style={styles.container}>
      <Lupine.FieldSet label="Loaded Info">
        <Lupine.FormField label="Loaded Race">
          {raceConfig ? (
            <Text>{raceConfig.name} </Text>
          ) : (
            <Text>No Race Loaded</Text>
          )}
        </Lupine.FormField>

        <Lupine.FormField label="Stored User ID" noMargin={true}>
          <Text>{userId}</Text>
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
