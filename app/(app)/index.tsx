import { StyleSheet, Text, View } from "react-native";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";

export default function Home() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  if (!raceConfig) throw new Error("Race config missing");
  const [userId] = useMMKVString("userId");

  return (
    <View style={styles.container}>
      <Text>Loaded Race: {raceConfig.name} </Text>
      <Text>Stored User ID: {userId}</Text>

      <Text style={styles.text}>The Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
  },
});
