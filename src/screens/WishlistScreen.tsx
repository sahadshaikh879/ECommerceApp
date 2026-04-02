import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import CommonHeader from '../components/shared/CommonHeader';
import ProductCard from '../components/product/ProductCard';
import { useAppSelector } from '../redux/hooks';
import { Colors, Spacing, FontSize } from '../theme/theme';

const FILTERS = ['All', 'Latest', 'Oldest'] as const;
type FilterType = typeof FILTERS[number];

const WishlistScreen = () => {
  const { favorites } = useAppSelector((state) => state.products);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    let result = [...favorites];

    // Search filter
    if (searchQuery.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting logic
    if (activeFilter === 'Latest') {
      result.sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0));
    } else if (activeFilter === 'Oldest') {
      result.sort((a, b) => (a.favoritedAt || 0) - (b.favoritedAt || 0));
    }

    return result;
  }, [favorites, activeFilter, searchQuery]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <CommonHeader title="FAVORITES" />

      <View style={{ paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, paddingBottom: Spacing.md }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Colors.black,
          paddingHorizontal: Spacing.md,
          height: 45,
        }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.placeholderTextColor}
            style={{
              flex: 1,
              fontSize: FontSize.regular,
              color: Colors.text,
              paddingVertical: 0,
            }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Image
            source={require('../assets/search.png')}
            style={{ width: 18, height: 18, tintColor: Colors.black }}
          />
        </View>
      </View>

      <View style={{ marginBottom: Spacing.md }}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 6,
              }, activeFilter === item && { backgroundColor: Colors.primary }]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[{
                  fontSize: 16,
                  color: Colors.subText,
                  fontWeight: '400',
                }, activeFilter === item && { color: Colors.white, fontWeight: '500' }]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.sm }}
        />
      </View>

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: Spacing.md }}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
            <Image 
                source={require('../assets/green.png')} 
                style={{ width: 60, height: 60, opacity: 0.2, marginBottom: Spacing.md }}
            />
            <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs }}>No favorites yet</Text>
            <Text style={{ fontSize: 14, color: Colors.subText, textAlign: 'center', paddingHorizontal: 40 }}>Start adding some plants to your wishlist!</Text>
          </View>
        }
      />
    </View>
  );
};

export default WishlistScreen;