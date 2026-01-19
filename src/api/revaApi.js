import axios from "axios";

// Environment variables for API configuration
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_TOKEN;

/**
 * Fetches bookings from the backend for a specific date range.
 * Uses POST method with FormData authentication as required by the API structure.
 * * @param {string} startDate - Start date string (YYYY-MM-DD)
 * @param {string} endDate - End date string (YYYY-MM-DD)
 * @returns {Promise<Array>} - Array of booking objects
 */
export const fetchBookings = async (startDate, endDate) => {
  const formData = new FormData();

  // Authentication Requirement: The API requires the key in the body
  formData.append("api_key", API_KEY);

  // Date Range Configuration:
  // Appending time ensures the filter covers the entire start and end days.
  formData.append("start", `${startDate} 00:00:00`);
  formData.append("end", `${endDate} 23:59:59`);

  try {
    // POST Request to the bookings index endpoint
    const response = await axios.post(`${API_URL}/bookings/index`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Returns the nested data array from the server response
    return response.data.data;
  } catch (error) {
    console.error("API Error fetching bookings:", error);
    throw error;
  }
};
