import { Ionicons } from "@expo/vector-icons";
import { addDays, format, parseISO } from "date-fns";
import { BlurView } from "expo-blur";
import { useMemo } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

/**
 * GlassDateRangePicker Component
 * * Implements the "Liquid Glass" design trend (Glassmorphism).
 * * Encapsulates calendar logic within a reusable, translucent modal.
 * * Features:
 * - Visuals: BlurView with semi-transparent layers.
 * - Logic: Range selection (Start Date -> End Date).
 * * @param {boolean} isVisible - Controls modal visibility.
 * @param {string} startDate - Selected start date (YYYY-MM-DD).
 * @param {string} endDate - Selected end date (YYYY-MM-DD).
 * @param {function} onDayPress - Handles date selection logic in parent.
 * @param {function} onClose - Closes the modal without applying.
 * @param {function} onApply - Triggers the filter action and closes.
 */
export default function GlassDateRangePicker({
  isVisible,
  startDate,
  endDate,
  onDayPress,
  onClose,
  onApply,
}) {
  // --- MEMOIZATION: DATE MARKING LOGIC ---
  // Calculates the colored strip efficiently only when dates change.
  // Returns an object compatible with react-native-calendars 'period' marking type.
  const markedDates = useMemo(() => {
    let marks = {};
    if (startDate) {
      // 1. Mark Start Date
      marks[startDate] = {
        startingDay: true,
        color: "#00845A",
        textColor: "white",
      };

      // 2. Mark Range in between (if End Date exists)
      if (endDate) {
        let curr = addDays(parseISO(startDate), 1);
        const end = parseISO(endDate);

        while (curr < end) {
          const dateStr = format(curr, "yyyy-MM-dd");
          // Light green background for the range interval
          marks[dateStr] = { color: "#E6F4F1", textColor: "#00845A" };
          curr = addDays(curr, 1);
        }

        // 3. Mark End Date
        marks[endDate] = {
          endingDay: true,
          color: "#00845A",
          textColor: "white",
        };
      }
    }
    return marks;
  }, [startDate, endDate]);

  if (!isVisible) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* LIQUID GLASS EFFECT: Dark tint with blur */}
        {/* On iOS, intensity 40 creates a frosted glass look. 
            On Android (if supported) or fallback, it creates a tinted layer. */}
        <BlurView
          intensity={Platform.OS === "ios" ? 40 : 100}
          tint="dark"
          style={styles.glassContainer}
        >
          {/* Header Section */}
          <View style={styles.headerRow}>
            <Text style={styles.glassTitle}>Select Dates</Text>
            <Pressable onPress={onClose} style={styles.hitBox}>
              <Ionicons
                name="close-circle-outline"
                size={28}
                color="rgba(255,255,255,0.8)"
              />
            </Pressable>
          </View>

          {/* Calendar Wrapper */}
          <View style={styles.calendarWrapper}>
            <Calendar
              // Default to today if no start date
              current={startDate || new Date().toISOString().split("T")[0]}
              markingType={"period"}
              markedDates={markedDates}
              onDayPress={onDayPress}
              // Dark Theme Customization
              theme={{
                calendarBackground: "transparent", // Vital for glass effect
                textSectionTitleColor: "#ffffff",
                selectedDayBackgroundColor: "#00845A",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00e676",
                dayTextColor: "#ffffff",
                textDisabledColor: "rgba(255,255,255,0.2)",
                arrowColor: "#00845A",
                monthTextColor: "#ffffff",
                textDayFontWeight: "600",
                textMonthFontWeight: "bold",
              }}
            />
          </View>

          {/* Apply Button */}
          <Pressable
            style={({ pressed }) => [
              styles.applyButton,
              {
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={onApply}
          >
            <Text style={styles.applyText}>Apply Filter</Text>
          </Pressable>
        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dimmed background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  glassContainer: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden", // Ensures blur doesn't leak
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)", // Shiny glass border
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  glassTitle: { fontSize: 22, fontWeight: "700", color: "white" },
  hitBox: { padding: 5 },
  calendarWrapper: {
    backgroundColor: "rgba(255,255,255,0.05)", // Subtle inner container
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#00845A",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  applyText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
