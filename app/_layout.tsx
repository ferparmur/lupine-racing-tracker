import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function () {
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
        name="info"
        options={{
          title: "Info",
          headerTitle: "About Lupine Racing Tracker",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="info-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
