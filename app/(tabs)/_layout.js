import { Tabs } from "expo-router";

/**
 * TabLayout Component
 * * This file configures the main bottom navigation (Tab Bar) for the application.
 * It uses Expo Router to define which screens are available in the tab bar.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // We hide the default navigation header globally because
        // each screen (index.js, explore.js) implements its own custom header.
        headerShown: false,
      }}
    >
      {/* Tab 1: Calendar / Home
        Maps to the file: app/(tabs)/index.js
      */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendario", // The label displayed on the bottom tab bar
        }}
      />

      {/* Tab 2: Explore
        Maps to the file: app/(tabs)/explore.js
      */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
        }}
      />
    </Tabs>
  );
}
