import { StyleSheet, Text, View } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <Text>T</Text>
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
