import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

/**
 * ModalScreen Component
 * * A simple auxiliary screen presented as a modal.
 * * Purpose: Displays general information about the project/challenge.
 */
export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Desafío</Text>

      {/* Visual Separator Line */}
      <View style={styles.separator} />

      <Text style={styles.text}>Aplicación Reva Challenge - 2026</Text>

      {/* Status Bar Configuration:
        On iOS, modals often appear with a dark background or specific presentation style,
        so 'light' text is usually preferred. On Android, 'auto' works best.
      */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%", // divider width relative to screen
    backgroundColor: "#eee",
  },
  text: {
    fontSize: 14,
    color: "#666",
  },
});
