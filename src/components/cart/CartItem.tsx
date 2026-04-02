import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch } from '../../redux/hooks';
import {
  toggleSelectItem,
  updateQuantity,
  removeFromCart,
  CartItem as CartItemType,
} from '../../redux/slices/cartSlice';
import { Colors, Spacing } from '../../theme/theme';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, quantity, selected } = item;

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: Colors.surface,
    }}>
      {/* Checkbox */}
      <TouchableOpacity
        style={{ marginRight: Spacing.md }}
        onPress={() => dispatch(toggleSelectItem(product.id))}
      >
        {selected ? (
          <Image 
            source={require('../../assets/Đã chọn 1.png')} 
            style={{ width: 22, height: 22, resizeMode: 'contain' }}
          />
        ) : (
          <View style={{
            width: 22,
            height: 22,
            borderWidth: 1.5,
            borderColor: Colors.darkOutline,
            borderRadius: 4,
            backgroundColor: Colors.white,
          }} />
        )}
      </TouchableOpacity>

      {/* Product Image */}
      <View style={{
        width: 80,
        height: 80,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: 4,
        marginRight: Spacing.md,
      }}>
        <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </View>

      {/* Info and Actions */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.dark }} numberOfLines={1}>
            {product.name} <Text style={{ fontWeight: '400', color: Colors.subText }}>| {product.category}</Text>
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.primary, marginBottom: 10 }}>${product.price}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              style={{
                width: 24,
                height: 24,
                borderWidth: 1,
                borderColor: Colors.dark,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
            >
              <Text style={{ fontSize: 16, color: Colors.dark, marginTop: -2 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.dark, minWidth: 16, textAlign: 'center' }}>{quantity}</Text>
            <TouchableOpacity 
              style={{
                width: 24,
                height: 24,
                borderWidth: 1,
                borderColor: Colors.dark,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
            >
              <Text style={{ fontSize: 16, color: Colors.dark, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => dispatch(removeFromCart(product.id))}>
            <Text style={{ fontSize: 14, color: Colors.dark, textDecorationLine: 'underline', fontWeight: '500' }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

