import { View } from "react-native";
import { RaceConfig } from "../types/raceConfig";
import { useMMKVNumber, useMMKVObject, useMMKVString } from "react-native-mmkv";
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
  const [userId, setUserId] = useMMKVString("userId");
  const [internalUserId, setInternalUserId] = useState<string | undefined>(
    userId,
  );

  const loadRaceConfig = async () => {
    setRaceConfig(undefined);
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
    // Intentionally left with no dependencies to trigger only once initially
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Lupine.Container paddingVertical={true}>
      <View>
        <Lupine.FormField label="Race Configuration">
          <Lupine.Text>
            {isLoadingRaceConfig || !raceConfig
              ? "Loading..."
              : raceConfigError
                ? `Error Loading Race Configuration: ${raceConfigError}`
                : `${raceConfig.name} ${
                    raceConfigLoadTimestamp
                      ? `(${getTimeAgo(raceConfigLoadTimestamp)})`
                      : ""
                  }`}
          </Lupine.Text>
        </Lupine.FormField>

        <Lupine.FormField label="User ID">
          <Lupine.TextInput
            value={internalUserId}
            onChangeText={(value) => {
              setInternalUserId(value);
            }}
          ></Lupine.TextInput>
        </Lupine.FormField>

        <Lupine.FormField>
          <Lupine.Button
            onPress={() => {
              storage.clearAll();
              loadRaceConfig();
            }}
            variant="danger"
            text="Reset Configuration"
          />
        </Lupine.FormField>

        <Lupine.FormField>
          <Lupine.Button
            onPress={() => {
              setUserId(internalUserId);
            }}
            text="Save User ID"
          />
        </Lupine.FormField>
      </View>
    </Lupine.Container>
  );
}
