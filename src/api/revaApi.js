import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_TOKEN;

export const fetchBookings = async (startDate, endDate) => {
  const formData = new FormData();
  formData.append('api_key', API_KEY);
  formData.append('start', `${startDate} 00:00:00`);
  formData.append('end', `${endDate} 23:59:59`);

  try {
    const response = await axios.post(`${API_URL}/bookings/index`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error en la API:", error);
    throw error;
  }
};