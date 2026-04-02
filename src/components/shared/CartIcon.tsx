import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { Colors } from '../../theme/theme';

interface CartIconProps {
  size?: number;
  tintColor?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ size = 25, tintColor = Colors.black }) => {
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{
      position: 'relative',
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
        source={require('../../assets/shopping-cart.png')}
        style={{ width: size, height: size, tintColor }}
      />
      {itemCount > 0 && (
        <View style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: Colors.primary,
          borderRadius: 10,
          minWidth: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
          zIndex: 10,
        }}>
          <Text style={{
            color: Colors.white,
            fontSize: 10,
            fontWeight: '700',
          }}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
};

export default CartIcon;

