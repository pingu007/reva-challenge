import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BookingCard({ item, onPress }) {
  // 1. DATA PARSING
  const startTime = item.start_time
    ? item.start_time.split(" ")[1].substring(0, 5)
    : "00:00";
  const endTime = item.end_time
    ? item.end_time.split(" ")[1].substring(0, 5)
    : "00:00";
  const courtName = item.field_name || "Cancha";
  const clientName = item.name || item.user_name || "Cliente Ocasional";
  const price = parseFloat(item.price || 0).toLocaleString("es-PY");
  const sport = item.sport_name?.toUpperCase() || "SPORT";

  // 2. LOGIC (Same as Details)
  const origin = item.origin ? item.origin.toLowerCase() : "";
  const isAppOrigin =
    origin.includes("search") ||
    origin.includes("favorite") ||
    origin === "app" ||
    origin === "web" ||
    origin === "mobile";
  const isAdminOrigin =
    origin.includes("admin") || origin === "auto-extent" || origin === "manual";

  let isAppBooking = false;
  if (origin) {
    isAppBooking = isAppOrigin && !isAdminOrigin;
  } else {
    isAppBooking = item.user_id !== null && item.user_id !== undefined;
  }

  const modality = item.modality ? item.modality.toLowerCase() : "";
  const isRecurring =
    modality === "recurring" ||
    modality === "fixed" ||
    item.is_recurrent === true ||
    origin === "auto-extent";
  const isConfirmed = item.pending === false;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {/* 🟢 COLUMNA 1: TIEMPO */}
      <View style={styles.timeColumn}>
        <Text style={styles.startTimeText}>{startTime}</Text>
        <Text style={styles.endTimeText}>{endTime}</Text>
      </View>

      {/* 🔵 COLUMNA 2: INFO PRINCIPAL */}
      <View style={styles.infoColumn}>
        {/* Cancha */}
        <Text style={styles.courtName} numberOfLines={1}>
          {courtName}
        </Text>

        {/* Cliente */}
        <Text style={styles.clientName} numberOfLines={1}>
          {clientName}
        </Text>

        {/* BADGES (Estilo Bento - Igual a Details) */}
        <View style={styles.indicatorsRow}>
          {/* Badge Deporte */}
          <View style={[styles.badge, styles.sportBadge]}>
            <Text style={styles.sportText}>{sport.slice(0, 8)}</Text>
          </View>

          {/* Badge Origen/Tipo */}
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
            !isRecurring && (
              <View style={[styles.badge, styles.manualBadge]}>
                <Ionicons name="person-outline" size={10} color="#6B7280" />
                <Text style={styles.manualText}>Manual</Text>
              </View>
            )
          )}

          {/* Badge Fija */}
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

      {/* 🟠 COLUMNA 3: PRECIO Y ESTADO */}
      <View style={styles.priceColumn}>
        <Text style={styles.priceText}>Gs. {price}</Text>

        <View style={styles.statusRow}>
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
    // Borde redondeado grande (Bento Style)
    borderRadius: 20,
    paddingVertical: 16, // Más aire vertical
    paddingHorizontal: 16,
    marginBottom: 12,
    // Sombra suave idéntica a Details
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    // Eliminamos el borde duro, dejamos solo un tinte muy sutil si es necesario
    // borderWidth: 1, borderColor: '#F3F4F6' <- Opcional, mejor sin borde para look limpio
  },

  // COLUMNA TIEMPO
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

  // COLUMNA INFO
  infoColumn: { flex: 1, justifyContent: "center", gap: 4 },
  courtName: { fontSize: 15, fontWeight: "800", color: "#111827" },
  clientName: { fontSize: 13, color: "#4B5563", fontWeight: "500" },

  indicatorsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8, // Badges más redondos
  },

  // Colores Idénticos a Details
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

  // COLUMNA PRECIO
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
