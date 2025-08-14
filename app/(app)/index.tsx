import { StyleSheet, View } from "react-native";
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
import { useEffect } from "react";
import backgroundGeolocationBaseConfig from "../../backgroundGeolocationBaseConfig";
import { theme } from "../../theme";
import Lupine from "../../components/Lupine";
import { getTimeAgo } from "../../utils/getTimeAgo";
import {
  ServerLocation,
  serverLocationSchema,
} from "../../types/serverLocation";

export default function Tracking() {
  const apiEndpoint = "https://lupine.fparedes.com/submit.php";
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");
  const [locationEnabled, setLocationEnabled] =
    useMMKVBoolean("locationEnabled");
  const [locations, setLocations] = useMMKVObject<Location[]>("locations");
  const [syncedLocations, setSyncedLocations] =
    useMMKVObject<ServerLocation[]>("syncedLocations");

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

    const onHttp: Subscription = BackgroundGeolocation.onHttp((response) => {
      const responseObject = JSON.parse(response.responseText);

      if (
        response.success &&
        responseObject &&
        serverLocationSchema.array().safeParse(responseObject).success
      ) {
        setSyncedLocations(responseObject);
        console.log(
          `[onHttp]: successful request. ${responseObject.length} locations retrieved from server`,
        );
      } else {
        console.log(
          `[onHttp]: unsuccessful request. Status: ${response.status}. Text: ${response.responseText}`,
        );
      }
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
      onHttp.remove();
    };
  }, [apiEndpoint, userId]);

  /// 3. start / stop BackgroundGeolocation
  useEffect(() => {
    if (locationEnabled && userId) {
      BackgroundGeolocation.start();
      console.log("BackgroundGeolocation Started");
    } else {
      BackgroundGeolocation.stop();
      console.log("BackgroundGeolocation Stopped");
    }
  }, [locationEnabled]);

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap
        raceConfig={raceConfig}
        locations={locations}
        syncedLocations={syncedLocations}
      />
      <Lupine.Container style={[styles.controlBar]}>
        <View style={[styles.recordStatusControl]}>
          <Lupine.RecordButton
            active={locationEnabled ?? false}
            onPress={() => setLocationEnabled(!locationEnabled)}
          />
          <View>
            <Lupine.Text>Tracking</Lupine.Text>
            <Lupine.Text
              variant="bold"
              style={[styles.recordStatusControlIndicator]}
            >
              {locationEnabled ? "ON" : "OFF"}
            </Lupine.Text>
          </View>
        </View>

        <View>
          <Lupine.Text>
            Last record:{" "}
            {locations
              ? getTimeAgo(locations[locations.length - 1].timestamp)
              : "N/A"}
          </Lupine.Text>
          <Lupine.Text>
            Last sync:{" "}
            {syncedLocations
              ? getTimeAgo(
                  syncedLocations[syncedLocations.length - 1].timestamp,
                )
              : "N/A"}
          </Lupine.Text>
        </View>
      </Lupine.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  controlBar: {
    height: 80,
    backgroundColor: theme.colors.white,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recordStatusControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[3],
  },
  recordStatusControlIndicator: {
    fontSize: 24,
  },
});
