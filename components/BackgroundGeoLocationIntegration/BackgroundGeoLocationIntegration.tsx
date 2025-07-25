import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";

import BackgroundGeolocation, {
  Location,
  Subscription,
} from "react-native-background-geolocation";
import backgroundGeolocationBaseConfig from "../../backgroundGeolocationBaseConfig";

type Props = {
  userToken: string;
  apiEndpoint: string;
};

const BackgroundGeoLocationIntegration = ({
  userToken,
  apiEndpoint,
}: Props) => {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[onLocation]", location);
        setLocation(JSON.stringify(location, null, 2));
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
        userToken,
      },
      url: apiEndpoint,
    }).then((state) => {
      setEnabled(state.enabled);
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
  }, []);

  /// 3. start / stop BackgroundGeolocation
  useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation("");
    }
  }, [enabled]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>Enable BackgroundGeolocation </Text>
      <Switch value={enabled} onValueChange={setEnabled} />
      <ScrollView>
        <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
          {location}
        </Text>
      </ScrollView>
    </View>
  );
};

export default BackgroundGeoLocationIntegration;
