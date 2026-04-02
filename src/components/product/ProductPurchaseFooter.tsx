import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, FontSize } from '../../theme/theme';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';
import { Product } from '../../redux/slices/productSlice';
import { useSnackbar } from '../../context/SnackbarProvider';

interface ProductPurchaseFooterProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils/constants/routes';

const ProductPurchaseFooter: React.FC<ProductPurchaseFooterProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { showSnackbar } = useSnackbar();
  const subtotal = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    showSnackbar('Plant added to cart!', 'success');
    navigation.navigate('MainTabs', { screen: ROUTES.CART });
  };

  return (
    <View style={{
      backgroundColor: Colors.white,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 34,
      borderTopWidth: 1,
      borderTopColor: Colors.lightBorder,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
      }}>
        <View>
          <Text style={{ fontSize: 13, color: Colors.subText, marginBottom: 6 }}>You picked {quantity} item</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: Colors.dark,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={onDecrement}
            >
              <Text style={{ fontSize: 20, fontWeight: '400', color: Colors.dark, marginTop: -2 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.dark, minWidth: 20, textAlign: 'center' }}>{quantity}</Text>
            <TouchableOpacity 
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: Colors.dark,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={onIncrement}
            >
              <Text style={{ fontSize: 20, fontWeight: '400', color: Colors.dark, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 13, color: Colors.subText, marginBottom: 2 }}>Subtotal</Text>
          <Text style={{ fontSize: 28, fontWeight: '700', color: Colors.black }}>${subtotal}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={{
          height: 50,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: quantity > 0 ? Colors.primary : Colors.disabled
        }}
        activeOpacity={0.8}
        disabled={quantity === 0}
        onPress={handleAddToCart}
      >
        <Text style={{
          color: Colors.white,
          fontSize: 16,
          fontWeight: '600',
          letterSpacing: 0.5,
        }}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductPurchaseFooter;

