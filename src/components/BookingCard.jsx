import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const BookingCard = ({ item, onPress }) => {
  // Security guard: If the item does not exist, nothing is rendered, preventing a crash.
  if (!item) return null;

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }
      ]}
    >
      <View style={styles.header}>
        {/* We use the ?. operator to avoid errors if the property is missing */}
        <Text style={styles.establishment}>
          {item.establishment_public_name || 'Establecimiento'}
        </Text>
        <Text style={styles.sportBadge}>
          {item.sport_name?.toUpperCase() || 'DEPORTE'}
        </Text>
      </View>

      <Text style={styles.fieldName}>{item.field_name || 'Cancha sin nombre'}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.time}>
          {item.start_time?.substring(11, 16) || '--:--'} - {item.end_time?.substring(11, 16) || '--:--'}
        </Text>
        <Text style={styles.price}>
          PYG {item.total_price ? parseFloat(item.total_price).toLocaleString() : '0'}
        </Text>
      </View>
    </Pressable>
  );
};

// ... (the same style)
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  establishment: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  sportBadge: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  fieldName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  time: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#58B35C',
  },
});

export default BookingCard;