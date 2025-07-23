import { StyleSheet, Text, View } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Thanks for testing the Lupine Racing Tracker. At the moment, the app is
        quite basic and ugly –that&apos;s because it&apos;s in its very early
        stages. We&apos;re just trying to test how background geolocation works
        and how it affects the device&apos;s battery
      </Text>
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
