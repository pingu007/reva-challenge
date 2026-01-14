import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchBookings } from '../../src/api/revaApi';
import BookingCard from '../../src/components/BookingCard';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to load bookings for a specific day
  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);
    setLoading(true);
    try {
      // We call Endpoint 1 using the selected date [cite: 17, 18]
      const data = await fetchBookings(day.dateString, day.dateString);
      setBookings(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#007AFF' }
        }}
        theme={{
          todayTextColor: '#007AFF',
          arrowColor: '#007AFF',
        }}
      />

      <View style={styles.listContainer}>
        <Text style={styles.title}>
          {selectedDate ? `Reservas para: ${selectedDate}` : 'Selecciona una fecha'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.booking_id.toString()}
            renderItem={({ item }) => (
            <BookingCard 
              item={item} 
               onPress={() => router.push({
                pathname: '/details',
                params: item // Here we send all the information to Endpoint 2 (Detail View)
             })} 
          />
        )}
            ListEmptyComponent={
              selectedDate && !loading && <Text style={styles.empty}>No hay reservas para este día.</Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  listContainer: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' }
});