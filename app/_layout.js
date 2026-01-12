import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* This groups your Calendar and Explore */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* This is the screen for Requirement 3.2: Reservation Details*/}
      <Stack.Screen name="details" options={{ title: 'Detalle de la Reserva' }} />
    </Stack>
  );
}