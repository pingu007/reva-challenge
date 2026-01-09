import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: API_URL,
});

/**
 * Fetches bookings from Reva API
 * @param start Start date (YYYY-MM-DD)
 * @param end End date (YYYY-MM-DD)
 */
export const fetchBookings = async (start: string, end: string) => {
  try {
    const formData = new FormData();
    formData.append('api_key', API_TOKEN || '');
    formData.append('start', start);
    formData.append('end', end);

    const response = await api.post('/bookings/index', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchBookings:", error);
    throw error;
  }
};