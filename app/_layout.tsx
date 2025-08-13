import { Stack } from "expo-router";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig, raceConfigSchema } from "../types/raceConfig";

export default function Root() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");

  const isConfigured =
    raceConfigSchema.safeParse(raceConfig).success &&
    (userId?.length ? userId.length > 0 : false);

  return (
    <Stack>
      <Stack.Protected guard={isConfigured}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isConfigured}>
        <Stack.Screen name="index" options={{ title: "App Configuration" }} />
      </Stack.Protected>
    </Stack>
  );
}
