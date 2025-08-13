import { StyleSheet, Text, View } from "react-native";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";
import BackgroundGeoLocationIntegration from "../../components/BackgroundGeoLocationIntegration/BackgroundGeoLocationIntegration";

export default function Tracking() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");

  return (
    <View style={styles.container}>
      <BackgroundGeoLocationIntegration
        userId={userId ?? ""}
        apiEndpoint="https://lupine.fparedes.com/submit.php"
      />
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
