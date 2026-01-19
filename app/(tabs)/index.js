import { Ionicons } from "@expo/vector-icons";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import Custom API and Components
import { fetchBookings } from "../../src/api/revaApi";
import BookingCard from "../../src/components/BookingCard";
import GlassDateRangePicker from "../../src/components/GlassDateRangePicker";

// Enable LayoutAnimation for Android devices
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [showGlassCalendar, setShowGlassCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [groupedBookings, setGroupedBookings] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [venueName, setVenueName] = useState("Cargando...");

  // --- LOGIC: SORTING ---
  const sortBookings = (bookings) => {
    return bookings.sort((a, b) => {
      const timeA = a.start_time.split(" ")[1];
      const timeB = b.start_time.split(" ")[1];
      if (timeA < timeB) return -1;
      if (timeA > timeB) return 1;

      const courtA = a.field_name || "";
      const courtB = b.field_name || "";
      return courtA.localeCompare(courtB, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
  };

  // --- LOGIC: GROUPING ---
  const groupDataByDate = (rawBookings) => {
    if (!Array.isArray(rawBookings)) return [];

    const sortedBookings = sortBookings([...rawBookings]);

    const groups = sortedBookings.reduce((acc, booking) => {
      const dateKey = booking.start_time.split(" ")[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(booking);
      return acc;
    }, {});

    return Object.keys(groups)
      .sort()
      .map((date) => ({
        title: date,
        data: groups[date],
        count: groups[date].length,
      }));
  };

  // --- LOGIC: ACCORDION TOGGLE ---
  const toggleSection = (title) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // --- API DATA FETCHING ---
  const loadBookings = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const data = await fetchBookings(startDate, endDate);

      if (data && data.length > 0) {
        const firstName = data[0].establishment_public_name;
        if (firstName) setVenueName(firstName);
      } else if (venueName === "Cargando...") {
        setVenueName("Mi Club");
      }

      setGroupedBookings(groupDataByDate(data));
      setCollapsedSections({});
    } catch (error) {
      console.error("Error loading bookings:", error);
      setVenueName("Mi Club");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [startDate, endDate]);

  const dateRangeText =
    startDate && endDate
      ? `${format(parseISO(startDate), "dd MMM", { locale: es })} - ${format(parseISO(endDate), "dd MMM", { locale: es })}`
      : "Filtrar por fecha";

  // --- RENDER COMPONENT: STICKY SECTION HEADER (CORREGIDO "NORMAL") ---
  const renderSectionHeader = ({ section: { title, count } }) => {
    const date = parseISO(title);

    // FORMATO "NORMAL": "MARTES 6 DE ENERO"
    let label = format(date, "EEEE d 'DE' MMMM", { locale: es }).toUpperCase();

    if (isToday(date)) label = "HOY, " + label;
    else if (isTomorrow(date)) label = "MAÑANA, " + label;

    const isCollapsed = collapsedSections[title];
    const countLabel = count === 1 ? "1 Reserva" : `${count} Reservas`;

    return (
      <View style={styles.stickyHeaderContainer}>
        <Pressable
          onPress={() => toggleSection(title)}
          style={styles.sectionHeaderContent}
        >
          <View style={styles.headerTitleRow}>
            {/* SIN CÍRCULO: Solo el texto limpio y legible */}
            <Text style={styles.sectionHeaderText}>{label}</Text>

            {/* Badge de cantidad */}
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{countLabel}</Text>
            </View>
          </View>

          <Ionicons
            name={isCollapsed ? "chevron-down" : "chevron-up"}
            size={16}
            color="#9CA3AF"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 1. MAIN HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={styles.greeting} numberOfLines={1} adjustsFontSizeToFit>
            {venueName}
          </Text>
          <Text style={styles.subGreeting}>Gestiona tus canchas</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.glassTriggerBtn,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => setShowGlassCalendar(true)}
        >
          <Ionicons name="calendar-outline" size={18} color="#111827" />
          <Text style={styles.triggerText}>{dateRangeText}</Text>
        </Pressable>
      </View>

      <GlassDateRangePicker
        isVisible={showGlassCalendar}
        startDate={startDate}
        endDate={endDate}
        onDayPress={(day) => {
          if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
          } else if (startDate && !endDate) {
            if (day.dateString < startDate) {
              setStartDate(day.dateString);
              setEndDate(startDate);
            } else {
              setEndDate(day.dateString);
            }
          }
        }}
        onClose={() => setShowGlassCalendar(false)}
        onApply={() => {
          setShowGlassCalendar(false);
          loadBookings();
        }}
      />

      {/* 3. BOOKING LIST */}
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00845A"
            style={{ marginTop: 50 }}
          />
        ) : (
          <SectionList
            sections={groupedBookings.map((section) => ({
              ...section,
              data: collapsedSections[section.title] ? [] : section.data,
            }))}
            keyExtractor={(item) =>
              item.booking_id?.toString() || Math.random().toString()
            }
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={renderSectionHeader}
            renderItem={({ item }) => (
              <BookingCard
                item={item}
                onPress={() =>
                  router.push({ pathname: "/details", params: { ...item } })
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="tennisball-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyText}>
                  No hay partidos en este rango.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#F9FAFB",
    zIndex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },

  glassTriggerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  triggerText: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#111827",
    fontSize: 12,
  },

  listContainer: { flex: 1, paddingHorizontal: 20 },

  // --- STICKY HEADER STYLES ---
  stickyHeaderContainer: {
    backgroundColor: "#F9FAFB",
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.03)",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  sectionHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },

  // (Estilos de círculo ELIMINADOS para limpieza)

  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  headerBadge: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  headerBadgeText: { fontSize: 10, fontWeight: "700", color: "#6B7280" },

  emptyState: { alignItems: "center", marginTop: 60, opacity: 0.8 },
  emptyText: { marginTop: 10, color: "#9CA3AF", fontSize: 16 },
});
