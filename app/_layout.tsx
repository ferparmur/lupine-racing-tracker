import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Lupine Racing Tracker" }} />
    </Stack>
  );
}
