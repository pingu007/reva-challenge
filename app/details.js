import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

/**
 * DetailsScreen Component
 * * Fulfils Requirement 3.2: Detailed view of a specific booking.
 * * Features:
 * - Displays complete booking info (User, Court, Time).
 * - simulated Product/Inventory management.
 * - Real-time cost calculation (Hourly Rate + Extras).
 * - Sticky Footer for payment actions.
 */
export default function DetailsScreen() {
  // Retrieve the specific booking object passed from the Calendar list
  const item = useLocalSearchParams();
  const router = useRouter();

  // Safe area insets to handle notches and home indicators on modern devices
  const insets = useSafeAreaInsets();

  // --- LOCAL STATE: PRODUCTS ---
  // Simulates an inventory system for adding extras to the booking
  const [products, setProducts] = useState([
    { id: 1, name: "Agua 500ml", price: 5000, qty: 0 },
    { id: 2, name: "Gatorade", price: 12000, qty: 0 },
    { id: 3, name: "Alquiler Paleta", price: 20000, qty: 0 },
    { id: 4, name: "Tubo Pelotas", price: 45000, qty: 0 },
  ]);

  // Manages the payment status toggle (Paid vs Pending)
  const [paymentStatus, setPaymentStatus] = useState(
    item.payment_status === "paid" ? "paid" : "pending",
  );

  // Base price derived from the booking data (Court Rental Fee)
  const [basePrice] = useState(
    parseFloat(item.price || item.field_amount || 0),
  );

  // --- LOGIC: DURATION & RATE CALCULATION ---
  /**
   * Calculates the booking duration in hours and derives the hourly rate.
   * Useful for showing the breakdown "Price per Hour" vs "Total".
   */
  const calculateDurationAndRate = () => {
    if (!item.start_time || !item.end_time) return { hours: 0, rate: 0 };

    // Parse strings "YYYY-MM-DD HH:mm:ss" into Date objects.
    // We replace " " with "T" to ensure strict ISO compatibility across JS engines (iOS/Android).
    const start = new Date(item.start_time.replace(" ", "T"));
    const end = new Date(item.end_time.replace(" ", "T"));

    // Calculate difference in milliseconds and convert to hours
    const diffMs = end - start;
    const hours = diffMs / (1000 * 60 * 60); // e.g., 1.5 hours

    // Calculate hourly rate (avoiding division by zero)
    const rate = hours > 0 ? basePrice / hours : basePrice;

    // Return formatted hours (removing .0 for integers) and the calculated rate
    return { hours: hours.toFixed(1).replace(".0", ""), rate };
  };

  const { hours, rate } = calculateDurationAndRate();

  // --- LOGIC: INVENTORY HELPERS ---
  // Updates the quantity of a specific product
  const updateQuantity = (id, change) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          // Ensure quantity never drops below 0
          const newQty = Math.max(0, p.qty + change);
          return { ...p, qty: newQty };
        }
        return p;
      }),
    );
  };

  // Calculate total cost of selected products
  const productsTotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  // GRAND TOTAL: Base Court Price + Products
  const grandTotal = basePrice + productsTotal;

  // --- LOGIC: ORIGIN & METADATA ---
  // Determine if booking was made via App or Manual Admin Entry
  const origin = item.origin ? item.origin.toLowerCase() : "";
  const isAppOrigin =
    origin.includes("search") ||
    origin.includes("favorite") ||
    origin === "app" ||
    origin === "web";
  const createdBy = isAppOrigin
    ? "Reserva Online (App)"
    : "Carga Administrativa";

  const isConfirmed = item.pending === "false";

  // Helper to format currency (Guaranies)
  const fmtPrice = (amount) => amount.toLocaleString("es-PY");

  return (
    <View style={styles.mainContainer}>
      {/* 1. HEADER CONFIGURATION */}
      <Stack.Screen
        options={{
          headerTitle: "Detalles de Reserva",
          headerTitleAlign: "center", // Ensures title is centered on Android & iOS
          headerTitleStyle: styles.headerTitle,
          headerTransparent: true,
          headerStyle: { backgroundColor: "transparent" },
          // Custom Back Button
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.headerBtnWrapper}
            >
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </Pressable>
          ),
          // Custom Action Buttons (Support/Report)
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={styles.headerBtnWrapper}
                onPress={() => Alert.alert("Soporte", "Abriendo chat...")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#00845A"
                />
              </Pressable>
              <Pressable
                style={styles.headerBtnWrapper}
                onPress={() => Alert.alert("Reportar", "Marcar incidencia")}
              >
                <Ionicons name="flag-outline" size={20} color="#EF4444" />
              </Pressable>
            </View>
          ),
        }}
      />

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION A: PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#9CA3AF" }}
            >
              {(item.name || item.user_name || "C")?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.clientName}>
              {item.name || item.user_name || "Cliente Ocasional"}
            </Text>
            <Text style={styles.clientTag}>{createdBy}</Text>
            {/* Status Badge */}
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isConfirmed ? "#DCFCE7" : "#FEF3C7" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: isConfirmed ? "#166534" : "#D97706" },
                ]}
              >
                {isConfirmed ? "CONFIRMADA" : "PENDIENTE DE PAGO"}
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION B: INFO GRID (Bento Style) */}
        <View style={styles.infoGrid}>
          {/* Time Box */}
          <View style={styles.infoBox}>
            <Ionicons
              name="time-outline"
              size={24}
              color="#00845A"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.infoLabel}>HORARIO ({hours} hs)</Text>
            <Text style={styles.infoValue}>
              {item.start_time?.split(" ")[1].substring(0, 5)} -{" "}
              {item.end_time?.split(" ")[1].substring(0, 5)}
            </Text>
            <Text style={styles.infoSubValue}>
              {item.start_time?.split(" ")[0]}
            </Text>
          </View>

          {/* Court Box */}
          <View style={styles.infoBox}>
            <MaterialCommunityIcons
              name="tennis-ball-outline"
              size={24}
              color="#00845A"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.infoLabel}>CANCHA</Text>
            <Text style={styles.infoValue}>{item.field_name}</Text>
            <Text style={styles.infoSubValue}>
              {item.sport_name?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* SECTION C: INVENTORY / PRODUCTS */}
        <View style={styles.productsCard}>
          <Text style={styles.sectionTitle}>Adicionales / Productos</Text>
          {products.map((prod) => (
            <View key={prod.id} style={styles.productRow}>
              <View>
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productPrice}>
                  Gs. {fmtPrice(prod.price)}
                </Text>
              </View>
              {/* Quantity Stepper */}
              <View style={styles.counterContainer}>
                <Pressable
                  onPress={() => updateQuantity(prod.id, -1)}
                  style={styles.counterBtn}
                >
                  <Ionicons name="remove" size={16} color="#374151" />
                </Pressable>
                <Text style={styles.counterValue}>{prod.qty}</Text>
                <Pressable
                  onPress={() => updateQuantity(prod.id, 1)}
                  style={styles.counterBtn}
                >
                  <Ionicons name="add" size={16} color="#374151" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* SECTION D: SECONDARY ACTIONS */}
        <View style={styles.actionsGrid}>
          <Pressable
            style={[styles.actionBtn, styles.modifyBtn]}
            onPress={() => Alert.alert("Modificar", "Función editar")}
          >
            <Text style={[styles.actionText, { color: "#374151" }]}>
              Modificar Reserva
            </Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, styles.cancelBtn]}
            onPress={() => Alert.alert("Cancelar", "¿Cancelar reserva?")}
          >
            <Text style={[styles.actionText, { color: "#EF4444" }]}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 3. STICKY FOOTER (Fixed at bottom) */}
      <View
        style={[
          styles.stickyFooter,
          // Add padding for Safe Area (e.g., iPhone Home Indicator)
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
      >
        {/* Row 1: Hourly Rate */}
        <View style={styles.financeRow}>
          <Text style={styles.financeLabel}>Precio Hora ({hours}hs)</Text>
          <Text style={styles.financeValue}>Gs. {fmtPrice(rate)}</Text>
        </View>

        {/* Row 2: Subtotal (Breakdown for clarity) */}
        <View style={styles.financeRow}>
          <Text style={[styles.financeLabel, { fontSize: 12 }]}>
            Subtotal Cancha
          </Text>
          <Text style={[styles.financeValue, { fontSize: 12 }]}>
            Gs. {fmtPrice(basePrice)}
          </Text>
        </View>

        {/* Row 3: Extras (Conditional) */}
        {productsTotal > 0 && (
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Productos Extra</Text>
            <Text style={styles.financeValue}>
              + Gs. {fmtPrice(productsTotal)}
            </Text>
          </View>
        )}

        {/* Row 4: GRAND TOTAL */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL A COBRAR</Text>
          <Text style={styles.totalValue}>Gs. {fmtPrice(grandTotal)}</Text>
        </View>

        {/* MAIN ACTION: PAY BUTTON */}
        <Pressable
          style={[
            styles.payButton,
            {
              // Visual feedback for paid state
              opacity: paymentStatus === "paid" ? 0.6 : 1,
              backgroundColor: paymentStatus === "paid" ? "#064E3B" : "#059669",
            },
          ]}
          onPress={() =>
            setPaymentStatus((prev) => (prev === "paid" ? "pending" : "paid"))
          }
        >
          <Ionicons
            name={
              paymentStatus === "paid" ? "checkmark-circle" : "cash-outline"
            }
            size={22}
            color="white"
          />
          <Text style={styles.payButtonText}>
            {paymentStatus === "paid"
              ? "COBRADO EN EFECTIVO"
              : "COBRAR EFECTIVO"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
