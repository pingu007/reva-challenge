import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const BookingCard = ({ booking, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: booking.field_picture_url }} 
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.establishment}>{booking.establishment_public_name}</Text>
        <Text style={styles.fieldName}>{booking.field_name}</Text>
        <Text style={styles.time}>{booking.start_time.split(' ')[1]} - {booking.end_time.split(' ')[1]}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, marginVertical: 8, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 120 },
  info: { padding: 10 },
  establishment: { fontSize: 12, color: '#666' },
  fieldName: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 14, color: '#007AFF', marginTop: 5 }
});