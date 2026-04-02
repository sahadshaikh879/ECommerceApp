import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeSelectedItems } from '../redux/slices/cartSlice';
import CommonHeader from '../components/shared/CommonHeader';
import CartItem from '../components/cart/CartItem';
import { Colors, Spacing } from '../theme/theme';
import { useSnackbar } from '../context/SnackbarProvider';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const { items } = useAppSelector((state) => state.cart);

  const selectedItems = items.filter((item) => item.selected);
  const hasSelectedItems = selectedItems.length > 0;
  
  const subtotal = items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  const handleRemoveSelected = () => {
    const count = selectedItems.length;
    dispatch(removeSelectedItems());
    showSnackbar(`Removed ${count} item${count > 1 ? 's' : ''} from cart`, 'info');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <CommonHeader 
        title="CART" 
        rightIcon={hasSelectedItems ? require('../assets/trash-2 (1) 1.png') : null}
        onRightPress={handleRemoveSelected}
        rightIconSize={24}
      />

      <View style={{ flex: 1 }}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.product.id.toString()}
            contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.md }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: Colors.subText }}>Your cart is empty.</Text>
          </View>
        )}
      </View>

      {/* Footer - Only show if cart is not empty */}
      {items.length > 0 && (
        <View style={{
          paddingHorizontal: Spacing.md,
          paddingTop: Spacing.md,
          paddingBottom: 34,
          borderTopWidth: 1,
          borderTopColor: Colors.lightBorder,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Spacing.md,
          }}>
            <Text style={{ fontSize: 16, color: Colors.subText }}>Subtotal</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.black }}>${subtotal}</Text>
          </View>

          <TouchableOpacity 
            style={{
              backgroundColor: Colors.primary,
              height: 56,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              position: 'relative',
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              color: Colors.white,
              fontSize: 16,
              fontWeight: '600',
            }}>Proceed to Checkout</Text>
            <Image 
              source={require('../assets/chevron-left.png')} 
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.white,
                transform: [{ rotate: '180deg' }],
                position: 'absolute',
                right: 20,
              }} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;