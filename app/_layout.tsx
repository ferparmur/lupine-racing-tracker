import { Stack } from "expo-router";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig, raceConfigSchema } from "../types/raceConfig";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");
  const [fontLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

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
