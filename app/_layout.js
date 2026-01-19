import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * RootLayout Component
 * * This is the top-level entry point for the application's navigation structure.
 * * It defines the global "Stack" navigator that allows navigating between the
 * main tabs and the detail screens.
 */
export default function RootLayout() {
  return (
    // SafeAreaProvider must wrap the entire application to correctly handle
    // device insets (notches, status bars, home indicators) on all screens.
    <SafeAreaProvider>
      <Stack>
        {/* 1. Main Tab Navigator 
          This loads the layout defined in app/(tabs)/_layout.js.
          We hide the stack header because the tabs have their own navigation bar.
        */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 2. Details Screen
          This screen is "pushed" on top of the tabs when a user selects a booking.
          It allows for the native "Back" navigation behavior.
        */}
        <Stack.Screen
          name="details"
          options={{ title: "Detalle de la Reserva" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
