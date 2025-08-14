import { StyleSheet, View } from "react-native";
import { LeafletMap } from "../../components/Lupine/LeafletMap";
import { useMMKVObject } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";
import BackgroundGeolocation, {
  Location,
} from "react-native-background-geolocation";
import { useEffect, useState } from "react";

export default function Home() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Fetch existing stored locations when component mounts
    const fetchLocations = async () => {
      try {
        const storedLocations = await BackgroundGeolocation.getLocations();
        setLocations(storedLocations as Location[]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();

    // Subscribe to real-time location updates
    const subscription = BackgroundGeolocation.onLocation(
      (location) => {
        setLocations((prev) => [...prev, location]);
      },
      (error) => {
        console.warn("Location error:", error);
      },
    );

    return () => {
      // Cleanup subscription
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap raceConfig={raceConfig} locations={locations} />
    </View>
  );
}
