import { Stack } from "expo-router";

export default function Root() {
  return (
    <Stack>
      <Stack.Protected guard={true}>
        <Stack.Screen name="index" options={{ title: "App Configuration" }} />
      </Stack.Protected>
    </Stack>
  );
}
