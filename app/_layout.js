import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Essential import

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{ title: "Detalle de la Reserva" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
