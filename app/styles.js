import { Platform, StyleSheet } from "react-native";

/**
 * Global Styles for DetailsScreen
 * * Organized by UI modules (Header, Profile, Info Grid, Footer).
 * * Uses a "Bento Grid" design language: rounded corners, soft shadows, and card-based layout.
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Light grey background for contrast
  },

  // --- HEADER CONFIGURATION ---
  // Custom styles for the navigation bar elements
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  headerBtnWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20, // Perfectly circular buttons
    // Platform-specific shadows for depth
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },

  // --- MAIN SCROLL CONTENT ---
  scrollContent: {
    padding: 20,
    paddingTop: 100, // Extra top padding to account for transparent header
    paddingBottom: 240, // Large bottom padding ensures content isn't hidden behind the Sticky Footer
    gap: 16, // Consistent spacing between Bento cards
  },

  // --- MODULE 1: PROFILE CARD ---
  // Displays user avatar, name, and booking status
  profileCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: { flex: 1 },
  clientName: { fontSize: 18, fontWeight: "800", color: "#111827" },
  clientTag: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusText: { fontSize: 10, fontWeight: "700" },

  // --- MODULE 2: INFO GRID (Time & Court) ---
  // Uses flexWrap to create a 2-column layout
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  infoBox: {
    flex: 1,
    minWidth: "45%", // Ensures two boxes fit side-by-side
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "700",
    marginBottom: 6,
  },
  infoValue: { fontSize: 15, fontWeight: "700", color: "#1F2937" },
  infoSubValue: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  // --- MODULE 3: INVENTORY / PRODUCTS ---
  productsCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  productName: { fontSize: 14, fontWeight: "600", color: "#374151" },
  productPrice: { fontSize: 12, color: "#9CA3AF" },

  // Custom Stepper Component Styles (+ / - buttons)
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 4,
  },
  counterBtn: {
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  counterValue: {
    marginHorizontal: 12,
    fontWeight: "700",
    fontSize: 14,
    minWidth: 20,
    textAlign: "center",
  },

  // --- MODULE 4: STICKY FOOTER ---
  // Fixed at the bottom of the screen to show totals and action button
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    // Heavy shadow to separate from content
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  financeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  financeLabel: { color: "#6B7280", fontSize: 14 },
  financeValue: { color: "#1F2937", fontSize: 14, fontWeight: "600" },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    marginBottom: 16,
  },
  totalLabel: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  totalValue: { color: "#059669", fontSize: 22, fontWeight: "900" },

  payButton: {
    backgroundColor: "#059669", // Success Green
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  payButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 8,
  },

  // --- MODULE 5: SECONDARY ACTIONS ---
  // Modify / Cancel buttons
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "white",
  },
  modifyBtn: { borderColor: "#E5E7EB" },
  cancelBtn: { borderColor: "#FECACA", backgroundColor: "#FEF2F2" }, // Light red background
  actionText: { fontWeight: "700", fontSize: 14 },
});

export default styles;
