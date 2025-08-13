import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Lupine Racing Tracker",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Lupine Racing Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
