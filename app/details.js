import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {
  const item = useLocalSearchParams();
  const router = useRouter();

  // Price formatting logic consistent with our BookingCard
  const formattedPrice = (() => {
    const val = item?.price || item?.field_amount || 0;
    return parseFloat(val).toLocaleString('es-PY');
  })();

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header configuration (Override) */}
      <Stack.Screen 
        options={{ 
          headerTransparent: true, 
          headerTitle: '',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()} 
              style={styles.customBackButton}
            >
          <Text style={styles.customBackText}>✕</Text>
        </Pressable>
      ),
    }}
    />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Header Hero Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.full_field_picture_url || 'https://via.placeholder.com/400x300?text=No+Image' }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
        </View>

        {/* Content Section with negative margin to overlap the image */}
        <View style={styles.contentCard}>
          <View style={styles.headerInfo}>
            <Text style={styles.sportTag}>{item.sport_name?.toUpperCase()}</Text>
            <Text style={styles.title}>{item.field_name}</Text>
            <Text style={styles.establishment}>{item.establishment_public_name}</Text>
          </View>

          <View style={styles.divider} />

          {/* Logical Grouping of Info */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DATE</Text>
              <Text style={styles.detailValue}>{item.start_time?.split(' ')[0]}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>TIME</Text>
              <Text style={styles.detailValue}>
                {item.start_time?.substring(11, 16)} - {item.end_time?.substring(11, 16)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>LOCATION</Text>
            <Text style={styles.addressText}>{item.establishment_address || 'No address provided'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RESERVATION DETAILS</Text>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>Booking ID: #{item.booking_id}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Footer for Price and Action */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>TOTAL PRICE</Text>
          <Text style={styles.priceValue}>PYG {formattedPrice}</Text>
        </View>
        <Pressable style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  imageContainer: { width: '100%', height: 350 },
  heroImage: { width: '100%', height: '100%' },
  customBackButton: {
    backgroundColor: 'rgba(255,255,255,0.9)', 
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8, // Small margin so it doesn't touch the edge of the iPhone
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 }
    })
  },
  customBackText: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  contentCard: {
    marginTop: -30,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 100
  },
  sportTag: { color: '#58B35C', fontWeight: 'bold', fontSize: 12, letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  establishment: { fontSize: 16, color: '#6B7280', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 20 },
  detailsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold', marginBottom: 4 },
  detailValue: { fontSize: 16, color: '#374151', fontWeight: '600' },
  section: { marginBottom: 25 },
  sectionLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold', marginBottom: 8 },
  addressText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  idBadge: { backgroundColor: '#F8F9FA', padding: 12, borderRadius: 10, alignSelf: 'flex-start' },
  idText: { fontSize: 12, color: '#6B7280', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6'
  },
  priceLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold' },
  priceValue: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  confirmButton: { backgroundColor: '#1F2937', paddingVertical: 14, paddingHorizontal: 35, borderRadius: 14 },
  confirmButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});