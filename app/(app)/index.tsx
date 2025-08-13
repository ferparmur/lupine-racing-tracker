import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LeafletMap } from "../../components/Lupine/LeafletMap";
import { useMMKVObject } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";

export default function Home() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap raceConfig={raceConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
