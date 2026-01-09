# Reva Challenge - Booking Calendar

This mobile application is developed using **React Native** and **Expo** (SDK 51) for the Reva technical challenge. The app provides a modular and secure interface to view and manage sports field bookings.

## Technologies Used
- **React Native / Expo**: Core framework for cross-platform development.
- **TypeScript**: Used throughout the project to ensure type safety and clean code.
- **Axios**: Implemented for robust API communication.
- **Environment Variables**: Managed via `.env` files to keep sensitive API keys secure.

## Setup and Installation

1. **Clone the repository:**
   git clone <your-repo-url>

2. **Install dependencies:**
   npm install

3. **Configure Environment Variables: Create a .env file in the root directory:**
   EXPO_PUBLIC_API_URL=[https://admin.reva.la/api/u](https://admin.reva.la/api/u)
   EXPO_PUBLIC_API_TOKEN=your_token_here
   
4. **Run the project:**
   npx expo start

## Roadmap & Progress

**Phase 1: Environment & Architecture**
[x] Initialize Expo project with TypeScript template.

[x] Design a scalable folder structure (src/api, src/types, etc.).

[x] Configure .gitignore to protect sensitive environment files.

[x] Initial Git repository setup and modular commits.

**Phase 2: API Service Integration**
[x] Implement a centralized API service in src/api/revaApi.ts.

[x] Configure Axios instance with multipart/form-data support.

[x] Secure API Key handling using process.env.

[x] Successfully verify data retrieval from Reva's /bookings/index endpoint.

**Phase 3: UI & Data Representation (Upcoming)**
[ ] Define TypeScript interfaces for Booking objects.

[ ] Create a reusable Booking Card component.

[ ] Implement a main view with a list of bookings.