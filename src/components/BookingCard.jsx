import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * BookingCard Component
 * * A reusable list item component that displays a single booking summary.
 * * Used in the HomeScreen SectionList.
 * * Features:
 * - Time column with start/end times.
 * - Info column with Court, Client, and Badges (Sport, Origin, Status).
 * - Price and Confirmation status.
 */
export default function BookingCard({ item, onPress }) {
  // --- 1. DATA PARSING & FORMATTING ---

  // Extract time substring (HH:MM) from "YYYY-MM-DD HH:MM:SS"
  const startTime = item.start_time
    ? item.start_time.split(" ")[1].substring(0, 5)
    : "00:00";
  const endTime = item.end_time
    ? item.end_time.split(" ")[1].substring(0, 5)
    : "00:00";

  const courtName = item.field_name || "Cancha";
  const clientName = item.name || item.user_name || "Cliente Ocasional";
  // Format price to Paraguayan Guaranies
  const price = parseFloat(item.price || 0).toLocaleString("es-PY");
  const sport = item.sport_name?.toUpperCase() || "SPORT";

  // --- 2. BUSINESS LOGIC (Origin & Badges) ---

  // Normalize origin string to determine booking source
  const origin = item.origin ? item.origin.toLowerCase() : "";
  const isAppOrigin =
    origin.includes("search") ||
    origin.includes("favorite") ||
    origin === "app" ||
    origin === "web" ||
    origin === "mobile";

  // Admin origins override app flags
  const isAdminOrigin =
    origin.includes("admin") || origin === "auto-extent" || origin === "manual";

  // Determine if badge should show "APP" or "MANUAL"
  let isAppBooking = false;
  if (origin) {
    isAppBooking = isAppOrigin && !isAdminOrigin;
  } else {
    // Fallback: if user_id exists, likely an app user
    isAppBooking = item.user_id !== null && item.user_id !== undefined;
  }

  // Determine Recurrence (Fixed Booking) status
  const modality = item.modality ? item.modality.toLowerCase() : "";
  const isRecurring =
    modality === "recurring" ||
    modality === "fixed" ||
    item.is_recurrent === true ||
    origin === "auto-extent";

  // Payment/Confirmation status
  const isConfirmed = item.pending === false;

  return (
    <Pressable
      onPress={onPress}
      // Add subtle scale animation on press for tactile feedback
      style={({ pressed }) => [
        styles.cardContainer,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {/* COLUMN 1: TIME INFO */}
      <View style={styles.timeColumn}>
        <Text style={styles.startTimeText}>{startTime}</Text>
        <Text style={styles.endTimeText}>{endTime}</Text>
      </View>

      {/* COLUMN 2: MAIN INFO (Court, Client, Badges) */}
      <View style={styles.infoColumn}>
        {/* Court Name */}
        <Text style={styles.courtName} numberOfLines={1}>
          {courtName}
        </Text>

        {/* Client Name */}
        <Text style={styles.clientName} numberOfLines={1}>
          {clientName}
        </Text>

        {/* BADGES ROW */}
        <View style={styles.indicatorsRow}>
          {/* Badge: Sport Name */}
          <View style={[styles.badge, styles.sportBadge]}>
            <Text style={styles.sportText}>{sport.slice(0, 8)}</Text>
          </View>

          {/* Badge: Origin (App vs Manual) */}
          {isAppBooking ? (
            <View style={[styles.badge, styles.appBadge]}>
              <Ionicons
                name="phone-portrait-outline"
                size={10}
                color="#007AFF"
              />
              <Text style={styles.appText}>App</Text>
            </View>
          ) : (
            // Show Manual only if it's not Recurring (to save space)
            !isRecurring && (
              <View style={[styles.badge, styles.manualBadge]}>
                <Ionicons name="person-outline" size={10} color="#6B7280" />
                <Text style={styles.manualText}>Manual</Text>
              </View>
            )
          )}

          {/* Badge: Recurring / Fixed */}
          {isRecurring && (
            <View style={[styles.badge, styles.recurringBadge]}>
              <Ionicons
                name="repeat"
                size={10}
                color="#FFFFFF"
                style={{ marginRight: 3 }}
              />
              <Text style={styles.badgeTextWhite}>Fija</Text>
            </View>
          )}
        </View>
      </View>

      {/* COLUMN 3: PRICE & STATUS */}
      <View style={styles.priceColumn}>
        <Text style={styles.priceText}>Gs. {price}</Text>

        <View style={styles.statusRow}>
          {/* Status Dot Indicator */}
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConfirmed ? "#00845A" : "#F59E0B" },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: isConfirmed ? "#00845A" : "#F59E0B" },
            ]}
          >
            {isConfirmed ? "Conf." : "Pend."}
          </Text>
        </View>
      </View>

      {/* Chevron Icon for navigability hint */}
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#E5E7EB"
        style={{ marginLeft: 6 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    // Bento Style Rounded Corners
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    // Soft Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // --- TIME COLUMN ---
  timeColumn: {
    alignItems: "center",
    paddingRight: 14,
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    marginRight: 14,
    minWidth: 55,
  },
  startTimeText: { fontSize: 16, fontWeight: "800", color: "#111827" },
  endTimeText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 2,
  },

  // --- INFO COLUMN ---
  infoColumn: { flex: 1, justifyContent: "center", gap: 4 },
  courtName: { fontSize: 15, fontWeight: "800", color: "#111827" },
  clientName: { fontSize: 13, color: "#4B5563", fontWeight: "500" },

  indicatorsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },

  // Badge Base Style
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  // Badge Colors (Matching Details Screen)
  sportBadge: { backgroundColor: "#F0FDF4" },
  sportText: { fontSize: 9, fontWeight: "800", color: "#166534" },

  appBadge: { backgroundColor: "#EFF6FF" },
  appText: { fontSize: 9, fontWeight: "700", color: "#1D4ED8", marginLeft: 4 },

  manualBadge: { backgroundColor: "#F3F4F6" },
  manualText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#6B7280",
    marginLeft: 4,
  },

  recurringBadge: { backgroundColor: "#1F2937" },
  badgeTextWhite: { fontSize: 9, fontWeight: "700", color: "white" },

  // --- PRICE COLUMN ---
  priceColumn: { alignItems: "flex-end", justifyContent: "center" },
  priceText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#059669",
    marginBottom: 4,
  },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: "700" },
});
