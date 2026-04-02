import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import CommonHeader from '../components/shared/CommonHeader';
import ProductCard from '../components/product/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProducts, setLoading, clearProducts } from '../redux/slices/productSlice';
import { Colors, Spacing, FontSize } from '../theme/theme';

const CATEGORIES = ['All', 'New', 'Outdoor', 'Indoor'] as const;
type CategoryType = typeof CATEGORIES[number];

const CATEGORY_MAP: Record<CategoryType, string | undefined> = {
  All: undefined,
  New: 'beauty',
  Outdoor: 'furniture',
  Indoor: 'home-decoration',
};

const ITEMS_PER_PAGE = 6;

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const { products, total, loading } = useAppSelector((state) => state.products);
  
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle immediate loads for category/page changes
  useEffect(() => {
    // Only proceed if search is empty, otherwise we're in search mode
    if (searchQuery.trim().length === 0) {
      loadProductsImmediate('');
    }
  }, [activeCategory, currentPage]);

  // Handle debounced load for search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const timer = setTimeout(() => {
        loadProductsImmediate(searchQuery);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const loadProductsImmediate = (search: string) => {
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    
    // Show loader immediately
    dispatch(setLoading(true));
    
    dispatch(fetchProducts({ 
      limit: ITEMS_PER_PAGE, 
      skip, 
      category: CATEGORY_MAP[activeCategory],
      searchQuery: search
    }));
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const handleCategoryPress = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const renderPagination = () => {
    // Hide pagination when searching (even if static)
    if (searchQuery.trim().length > 0) return null;

    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.lg,
        marginBottom: Spacing.xl,
        gap: 8,
      }}>
        <TouchableOpacity 
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <Image 
            source={require('../assets/chevron-left.png')} 
            style={[{ width: 20, height: 20, tintColor: Colors.black }, currentPage === 1 && { opacity: 0.3 }]} 
          />
        </TouchableOpacity>
        
        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            style={[{
              width: 40,
              height: 40,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }, currentPage === page && { backgroundColor: Colors.primary }]}
            onPress={() => handlePageChange(page)}
          >
            <Text
              style={[{
                fontSize: 16,
                color: Colors.text,
              }, currentPage === page && { color: Colors.white, fontWeight: '600' }]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}

        {totalPages > 5 && <Text style={{ fontSize: 16, color: Colors.text, marginHorizontal: 4 }}>...</Text>}

        <TouchableOpacity 
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={currentPage === totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          <Image 
            source={require('../assets/chevron-left.png')} 
            style={[
              { width: 20, height: 20, tintColor: Colors.black }, 
              { transform: [{ rotate: '180deg' }] },
              currentPage === totalPages && { opacity: 0.3 }
            ]} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <CommonHeader title="SHOP" />
      
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
            onChangeText={handleSearchChange}
          />
          <Image
            source={require('../assets/search.png')}
            style={{ width: 18, height: 18, tintColor: Colors.black }}
          />
        </View>
      </View>

      <View style={{ marginBottom: Spacing.md }}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[{
                paddingHorizontal: 20,
                paddingVertical: 6,
                borderRadius: 6,
              }, activeCategory === item && { backgroundColor: Colors.primary }]}
              onPress={() => handleCategoryPress(item)}
            >
              <Text
                style={[{
                  fontSize: 16,
                  color: Colors.subText,
                  fontWeight: '400',
                }, activeCategory === item && { color: Colors.white, fontWeight: '500' }]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.sm }}
        />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: Spacing.md }}
          contentContainerStyle={{ paddingBottom: Spacing.xl }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderPagination}
          ListEmptyComponent={
            <View style={{
              paddingTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
              <Text style={{ fontSize: 16, color: Colors.subText, fontWeight: '500' }}>No product found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default ShopScreen;

