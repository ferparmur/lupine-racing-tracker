import { View, Text } from "react-native";
import { RaceConfig } from "../types/raceConfig";
import { useMMKVNumber, useMMKVObject } from "react-native-mmkv";
import { useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { fetchRaceConfig } from "../utils/fetchRaceConfig";
import Lupine from "../components/Lupine";
import { getTimeAgo } from "../utils/getTimeAgo";

export default function Index() {
  const [raceConfig, setRaceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [raceConfigError, setRaceConfigError] = useState<string>("");
  const [isLoadingRaceConfig, setIsLoadingRaceConfig] =
    useState<boolean>(false);
  const [raceConfigLoadTimestamp, setRaceConfigLoadTimestamp] = useMMKVNumber(
    "raceConfigLoadTimestamp",
  );

  const loadRaceConfig = async () => {
    setIsLoadingRaceConfig(true);
    try {
      const raceConfig = await fetchRaceConfig();
      setRaceConfig(raceConfig);
      setRaceConfigError("");
      setRaceConfigLoadTimestamp(Date.now());
    } catch (err) {
      if (err instanceof Error) {
        setRaceConfigError(err.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoadingRaceConfig(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!raceConfig) {
      loadRaceConfig();
    }
    console.log("initial");
  }, []);

  return (
    <View>
      <View>
        {isLoadingRaceConfig || !raceConfig ? (
          <Text>Loading Race Configuration...</Text>
        ) : (
          <Text>
            Loaded Race: {raceConfig.name}{" "}
            {raceConfigLoadTimestamp
              ? `(${getTimeAgo(raceConfigLoadTimestamp)})`
              : ""}
          </Text>
        )}

        {raceConfigError ? (
          <Text>Error Loading Race Configuration: {raceConfigError}</Text>
        ) : null}

        <Lupine.Button
          onPress={() => {
            storage.clearAll();
            loadRaceConfig();
          }}
          text="Clear Storage And Reload Configuration"
        />
      </View>
    </View>
  );
}
