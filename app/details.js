import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  // Here we receive the data we send from the main screen
  const item = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.field_picture_url }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.establishment}>{item.establishment_public_name}</Text>
        <Text style={styles.title}>{item.field_name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Deporte:</Text>
          <Text style={styles.value}>{item.sport_name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Horario:</Text>
          <Text style={styles.value}>{item.start_time} - {item.end_time}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Precio Total:</Text>
          <Text style={styles.price}>{item.currency_code} {item.price}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Reserva ID:</Text>
          <Text style={styles.value}>#{item.booking_id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  establishment: { fontSize: 14, color: '#666', textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  section: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', pb: 10 },
  label: { fontSize: 12, color: '#888', fontWeight: 'bold' },
  value: { fontSize: 16, color: '#333' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#2E7D32' }
});