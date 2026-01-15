# Reva Challenge - Booking Management App

A mobile application developed with **React Native** and **Expo** to manage and visualize sports facility bookings.

## Implemented Features
- **Full JavaScript Migration:** The project was successfully migrated from TypeScript to **pure JavaScript** to ensure a clean, maintainable, and standardized codebase.
- **Interactive Calendar** Dynamic booking filtering based on the selected date.
- **Booking Details View** Dedicated screen displaying all available information for an individual booking, including ID, Sport, Schedule, and Pricing.
- **API Integration:** Robust consumption of Reva's endpoints using Axios, with secure environment variable management.

## Tech Stack & Structure
- **Framework:** Expo (React Native) with Expo Router.
- **UI Components:** React Native Calendars.
- **Architecture:** Optimized directory structure, free of orphan TypeScript files and broken path aliases.

> **Note on UI:** Current development has prioritized functional logic and technical stability. Future iterations will focus on aesthetic polishing and enhanced UI/UX design.

## Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
      npm install

### Latest UI/UX Improvements
- **Enhanced Booking Cards:** Implemented a cleaner hierarchy by removing heavy borders and adding subtle elevation/shadows for a premium feel.
- **Improved Typography:** Applied high-contrast color scales to distinguish between primary information (Field Name) and metadata (Sport, Establishment).
- **Micro-interactions:** Added tactile feedback using scale transformations on pressable elements to improve user confidence.
- **Robustness:** Integrated optional chaining and safety guards to prevent UI crashes during data fetching.
  
- **Data Integrity & UI Refinement**
- **Consolidated Pricing Logic:** Successfully resolved a cross-view data discrepancy where prices were missing in the main feed.
- **Robust Component Pattern:** Implemented an IIFE (Immediately Invoked Function Expression) within the UI to dynamically fetch pricing from multiple possible API fields.
- **Visual Polish:** Fully transitioned to a borderless, shadow-based card design that maintains high performance on both iOS and Android.

### Technical Achievement: API Data Inspection
- **Terminal Logging:** Successfully enabled and utilized Node.js terminal logs to inspect the real-time JSON structure of the Reva API.
- **Data Field Discovery:** Identified `price` and `field_amount` as the primary keys for financial data, resolving previous rendering issues.
- **Precision Handling:** Implemented `parseFloat` with `toLocaleString` to correctly manage string-to-number conversions and regional currency formatting (PYG).