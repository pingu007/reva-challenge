import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export default function DetailsScreen() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- ESTADO PRODUCTOS ---
  const [products, setProducts] = useState([
    { id: 1, name: "Agua 500ml", price: 5000, qty: 0 },
    { id: 2, name: "Gatorade", price: 12000, qty: 0 },
    { id: 3, name: "Alquiler Paleta", price: 20000, qty: 0 },
    { id: 4, name: "Tubo Pelotas", price: 45000, qty: 0 },
  ]);

  const [paymentStatus, setPaymentStatus] = useState(
    item.payment_status === "paid" ? "paid" : "pending",
  );

  // Precio base total que viene de la reserva (Subtotal Cancha)
  const [basePrice] = useState(
    parseFloat(item.price || item.field_amount || 0),
  );

  // --- CÁLCULO DE HORAS Y PRECIO POR HORA ---
  const calculateDurationAndRate = () => {
    if (!item.start_time || !item.end_time) return { hours: 0, rate: 0 };

    // Convertir fechas (formato "YYYY-MM-DD HH:mm:ss") a objetos Date
    // Reemplazamos espacio por T para asegurar compatibilidad en algunos JS engines
    const start = new Date(item.start_time.replace(" ", "T"));
    const end = new Date(item.end_time.replace(" ", "T"));

    // Diferencia en milisegundos -> horas
    const diffMs = end - start;
    const hours = diffMs / (1000 * 60 * 60); // ej: 1.5 horas

    // Evitamos división por cero
    const rate = hours > 0 ? basePrice / hours : basePrice;

    return { hours: hours.toFixed(1).replace(".0", ""), rate }; // .replace quita el .0 si es entero
  };

  const { hours, rate } = calculateDurationAndRate();

  // --- HELPERS ---
  const updateQuantity = (id, change) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newQty = Math.max(0, p.qty + change);
          return { ...p, qty: newQty };
        }
        return p;
      }),
    );
  };

  const productsTotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  // EL GRAN TOTAL: (Precio Base ya incluye horas) + Productos
  // Nota: basePrice es el total de la cancha, no el precio por hora.
  const grandTotal = basePrice + productsTotal;

  // Lógica Origen
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
  const fmtPrice = (amount) => amount.toLocaleString("es-PY");

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <Stack.Screen
        options={{
          headerTitle: "Detalles de Reserva",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          headerTransparent: true,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.headerBtnWrapper}
            >
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </Pressable>
          ),
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

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. PROFILE MODULE */}
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

        {/* 2. INFO BENTO */}
        <View style={styles.infoGrid}>
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

        {/* 3. INVENTORY MODULE */}
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

        {/* 5. ACTIONS */}
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

      {/* --- 4. STATIC FOOTER (FIXED) --- */}
      <View
        style={[
          styles.stickyFooter,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
      >
        {/* FILA 1: PRECIO POR HORA (Lo que pediste) */}
        <View style={styles.financeRow}>
          <Text style={styles.financeLabel}>Precio Hora ({hours}hs)</Text>
          <Text style={styles.financeValue}>Gs. {fmtPrice(rate)}</Text>
        </View>

        {/* FILA EXTRA: SUBTOTAL CANCHA (Para que la matemática visual cuadre con el total) */}
        <View style={styles.financeRow}>
          <Text style={[styles.financeLabel, { fontSize: 12 }]}>
            Subtotal Cancha
          </Text>
          <Text style={[styles.financeValue, { fontSize: 12 }]}>
            Gs. {fmtPrice(basePrice)}
          </Text>
        </View>

        {productsTotal > 0 && (
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Productos Extra</Text>
            <Text style={styles.financeValue}>
              + Gs. {fmtPrice(productsTotal)}
            </Text>
          </View>
        )}

        {/* TOTAL FINAL: Fuente ajustada */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL A COBRAR</Text>
          <Text style={styles.totalValue}>Gs. {fmtPrice(grandTotal)}</Text>
        </View>

        <Pressable
          style={[
            styles.payButton,
            {
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
