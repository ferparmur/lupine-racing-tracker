import { StyleSheet, Text, View } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <Text>
        Thanks for testing the Lupine Racing Tracker. At the moment, the app is
        quite basic and ugly –that's because it's in its very early stages.
        We're just trying to test how background geolocation works and how it
        affects the device's battery
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
});
