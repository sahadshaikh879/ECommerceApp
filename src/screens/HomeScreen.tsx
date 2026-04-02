import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import HomeHeader from "../components/shared/HomeHeader.tsx";
import HeroBanner from "../components/home/HeroBanner.tsx";
import HomeSectionHeader from "../components/home/HomeSectionHeader.tsx";
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/shared/Loader';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProducts, loadFavorites } from '../redux/slices/productSlice';
import { Spacing, Colors } from '../theme/theme';

import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../utils/constants/routes';

const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const { products, loading } = useAppSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        if (searchQuery.trim().length === 0) {
            // Immediate fetch on mount or when search is cleared
            dispatch(fetchProducts({ limit: 6, searchQuery: '' }));
        } else {
            // Debounce fetch while typing
            const timer = setTimeout(() => {
                dispatch(fetchProducts({ limit: 6, searchQuery }));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, searchQuery]);

    const isSearching = searchQuery.trim().length > 0;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <FlatList
                data={products.slice(0, 6)}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={
                    <>
                        <HomeHeader value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
                        {!isSearching && (
                          <>
                            <HeroBanner />
                            <HomeSectionHeader 
                                title="Plants" 
                                onPressViewAll={() => navigation.navigate(ROUTES.SHOP)} 
                            />
                          </>
                        )}
                    </>
                }
                renderItem={({ item }) => <ProductCard product={item} />}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: Spacing.md,
                }}
                ListEmptyComponent={loading ? <Loader /> : (
                  <View style={{ paddingTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: Colors.subText, fontWeight: '500' }}>No product found</Text>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: Spacing.lg, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default HomeScreen;