import { Tabs } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Tracking",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="location-arrow" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="countries"
        options={{
          title: "Countries",
          headerTitle: "Country Count Reporting",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="earth-europe" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checkpoint"
        options={{
          title: "Checkpoint",
          headerTitle: "Checkpoint Check-in",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="square-check" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Lupine Racing Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
