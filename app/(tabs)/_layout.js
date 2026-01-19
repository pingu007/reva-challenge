import { Tabs } from "expo-router";

/**
 * TabLayout Component
 * * Configures the main bottom navigation.
 */
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Main Tab: Calendar / Home
        Maps to: app/(tabs)/index.js
      */}
      <Tabs.Screen name="index" options={{ title: "Calendario" }} />
    </Tabs>
  );
}
