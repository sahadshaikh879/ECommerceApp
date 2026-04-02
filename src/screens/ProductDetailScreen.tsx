import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProductById, clearCurrentProduct, toggleFavorite } from '../redux/slices/productSlice';
import CommonHeader from '../components/shared/CommonHeader';
import { Colors, Spacing, FontSize } from '../theme/theme';
import Loader from '../components/shared/Loader';

import ProductImageCarousel from '../components/product/ProductImageCarousel';
import ProductPurchaseFooter from '../components/product/ProductPurchaseFooter';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { productId } = route.params;

  const { currentProduct, loadingDetail } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  if (loadingDetail || !currentProduct) {
    return <Loader />;
  }

  const images: string[] = (currentProduct as any).images && (currentProduct as any).images.length > 0 
    ? (currentProduct as any).images 
    : [currentProduct.imageUrl];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <CommonHeader title={currentProduct.name} />

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.md }}>
          <ProductImageCarousel images={images} />

          <View style={{ paddingHorizontal: Spacing.md, paddingTop: Spacing.md }}>
            {/* Badges & Stock */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 }}>
                  <Text style={{ color: Colors.white, fontWeight: '500', fontSize: 11, textTransform: 'capitalize' }}>Plants</Text>
                </View>
                <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 }}>
                  <Text style={{ color: Colors.white, fontWeight: '500', fontSize: 11, textTransform: 'capitalize' }}>{currentProduct.category}</Text>
                </View>
              </View>
              <Text style={{ color: Colors.success, fontWeight: '600', fontSize: 13 }}>{currentProduct.stock || 156} items left</Text>
            </View>

            {/* Title & Favorite */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.dark, flex: 1, marginRight: 10 }}>{currentProduct.name}</Text>
              <TouchableOpacity onPress={() => dispatch(toggleFavorite(currentProduct.id))}>
                <Image
                  source={
                    currentProduct.isFavorite
                      ? require('../assets/green.png')
                      : require('../assets/dil.png')
                  }
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>

            {/* Price */}
            <Text style={{ fontSize: 22, fontWeight: '700', color: Colors.primary, marginBottom: Spacing.md }}>${currentProduct.price}</Text>

            {/* Details Section */}
            <View style={{ marginTop: Spacing.sm }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 4 }}>Details</Text>
              <View style={{ height: 1, backgroundColor: Colors.border, marginBottom: 8 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: Colors.subText }}>Mass</Text>
                <Text style={{ fontSize: 14, color: Colors.text, fontWeight: '500' }}>{currentProduct.weight || 1}kg</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: Colors.subText }}>Origin</Text>
                <Text style={{ fontSize: 14, color: Colors.text, fontWeight: '500' }}>Africa</Text>
              </View>
            </View>

            {/* Description Section */}
            <View style={{ marginTop: Spacing.sm }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 4 }}>Description</Text>
              <View style={{ height: 1, backgroundColor: Colors.border, marginBottom: 8 }} />
              <Text style={{ fontSize: 14, color: Colors.subText, lineHeight: 20 }}>{currentProduct.description || 'No description available.'}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <ProductPurchaseFooter 
        product={currentProduct}
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </View>
  );
};

export default ProductDetailScreen;

