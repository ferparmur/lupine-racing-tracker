import { StyleSheet, Text, View } from "react-native";
import { LeafletMap } from "../../components/Lupine/LeafletMap";
import {
  useMMKVBoolean,
  useMMKVNumber,
  useMMKVObject,
  useMMKVString,
} from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";
import BackgroundGeolocation, {
  Location,
  Subscription,
} from "react-native-background-geolocation";
import { useEffect, useState } from "react";
import backgroundGeolocationBaseConfig from "../../backgroundGeolocationBaseConfig";
import { theme } from "../../theme";
import Lupine from "../../components/Lupine";

export default function Tracking() {
  const apiEndpoint = "https://lupine.fparedes.com/submit.php";
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");
  const [locationEnabled, setLocationEnabled] =
    useMMKVBoolean("locationEnabled");
  const [currentLocation, setCurrentLocation] =
    useMMKVObject<Location>("currentLocation");
  const [locations, setLocations] = useMMKVObject<Location[]>("locations");
  const [syncedLocations, setSyncedLocations] =
    useMMKVObject<Location[]>("syncedLocations");
  const [lastLocationUpdateTimestamp, setLastLocationUpdateTimestamp] =
    useMMKVNumber("lastLocationUpdateTimestamp");
  const [lastLocationSyncTimestamp, setLastLocationSyncTimestamp] =
    useMMKVNumber("lastLocationUpdateTimestamp");

  useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[onLocation]", location);
        setLocations([...(locations ?? []), location]);
      },
    );

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      (event) => {
        console.log("[onMotionChange]", event);
      },
    );

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange((event) => {
        console.log("[onActivityChange]", event);
      });

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange((event) => {
        console.log("[onProviderChange]", event);
      });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      ...backgroundGeolocationBaseConfig,
      extras: {
        userId: userId ?? "",
      },
      url: apiEndpoint,
    }).then((state) => {
      setLocationEnabled(state.enabled);
      console.log(
        "- BackgroundGeolocation is configured and ready: ",
        state.enabled,
      );
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, [apiEndpoint, userId]);

  /// 3. start / stop BackgroundGeolocation
  useEffect(() => {
    if (locationEnabled) {
      BackgroundGeolocation.start();
      console.log("BackgroundGeolocation Started");
    } else {
      BackgroundGeolocation.stop();
      setCurrentLocation(undefined);
      console.log("BackgroundGeolocation Stopped");
    }
  }, [locationEnabled]);

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap raceConfig={raceConfig} locations={locations} />
      <View style={[styles.controlBar]}>
        <View style={[styles.recordStatusControl]}>
          <Lupine.RecordButton
            active={locationEnabled ?? false}
            onPress={() => setLocationEnabled(!locationEnabled)}
          />
          <View>
            <Text>Tracking</Text>
            <Text>{locationEnabled ? "ON" : "OFF"}</Text>
          </View>
        </View>

        <View>
          <Text>Last record: just now</Text>
          <Text>Last sync: just now</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlBar: {
    height: 80,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recordStatusControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[3],
  },
});
