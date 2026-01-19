# Reva Challenge - Booking Management App

A mobile application developed with **React Native** and **Expo** to manage and visualize sports facility bookings. This solution focuses on a clean UI, robust API integration, and modern design patterns.

## Implemented Features

### 1. Interactive Calendar & Agenda (Home)

- **Fluid Agenda View:** Implemented a `SectionList` with **Sticky Headers** that group bookings by date. The header design was refined to be clean and legible, ensuring users always know which date they are viewing without visual clutter.
- **Glassmorphism Date Picker:** A custom date range selector built with `BlurView` (Liquid Glass effect) that allows users to filter bookings by specific periods with visual validation.
- **Smart Sorting:** Bookings are automatically sorted by time and court name for a logical flow.

### 2. Booking Details View (Details)

- **Bento Grid Layout:** Information is organized into modular cards (Profile, Schedule, Inventory) for better readability and visual hierarchy.
- **Dynamic Financial Calculation:** Real-time calculation of costs, separating the **Hourly Rate** from the **Total**, including a simulation of additional products (inventory).
- **Sticky Footer Actions:** A static action bar at the bottom for payments, ensuring the "Pay" button is always accessible without obstructing content.

### 3. API Integration

- **Robust Fetching:** Consumes Reva's endpoints using `axios` with `FormData` for secure authentication.
- **Environment Security:** API keys and URLs are managed via `.env` files (with a `.env.example` provided for safety).

---

## Tech Stack & Structure

- **Framework:** Expo SDK 52 (React Native).
- **Routing:** Expo Router (Stack & Tabs).
- **UI Libraries:** `react-native-calendars`, `expo-blur`.
- **Utilities:** `date-fns` for robust date formatting.
- **Architecture:** Clean Architecture with clear separation of concerns:
  - `/app`: Screens and Navigation layouts.
  - `/src/api`: API logic and services.
  - `/src/components`: Reusable UI components.

> **Note on Code Quality:** The project includes strict JSDoc documentation, structured Git history, and has been purged of unused boilerplate files
