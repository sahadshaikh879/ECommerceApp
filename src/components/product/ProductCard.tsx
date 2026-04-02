import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Spacing } from '../../theme/theme';
import { useAppDispatch } from '../../redux/hooks';
import { toggleFavorite, Product } from '../../redux/slices/productSlice';
import { useSnackbar } from '../../context/SnackbarProvider';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.md * 3) / 2;

interface ProductCardProps {
  product: Product;
}

import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils/constants/routes';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { showSnackbar } = useSnackbar();

  const handleFavorite = () => {
    dispatch(toggleFavorite(product.id));
    showSnackbar(
      product.isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      product.isFavorite ? 'info' : 'success'
    );
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAIL, { productId: product.id })}
      style={{ width: CARD_WIDTH, marginBottom: Spacing.lg }}
    >
      <View
        style={{
          width: CARD_WIDTH,
          height: CARD_WIDTH * 1.1,
          backgroundColor: Colors.surface,
          borderRadius: 16,
          padding: Spacing.sm,
          position: 'relative',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            zIndex: 10,
          }}
          onPress={handleFavorite}
        >
          <Image
            source={
              product.isFavorite
                ? require('../../assets/green.png')
                : require('../../assets/dil.png')
            }
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: product.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>

      <View style={{ paddingTop: Spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 16, fontWeight: '500', color: Colors.text, marginTop: 4 }}
        >
          {product.name}
        </Text>
        <Text style={{ fontSize: 14, color: Colors.subText, marginTop: 2 }}>{product.category}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: Colors.primary,
            marginTop: 4,
          }}
        >
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default ProductCard;
