import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize } from '../../theme/theme';
import { ROUTES } from '../../utils/constants/routes';

interface CommonHeaderProps {
  title: string;
  rightIcon?: any;
  onRightPress?: () => void;
  rightIconSize?: number;
  hideBack?: boolean;
  showRight?: boolean;
}

import CartIcon from './CartIcon';

const CommonHeader: React.FC<CommonHeaderProps> = ({ 
  title, 
  rightIcon, 
  onRightPress,
  rightIconSize = 30,
  hideBack = false,
  showRight = true,
}) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        height: 60,
      }}>
        {hideBack ? (
          <View style={{ width: 48, height: 48, justifyContent: 'center' }} />
        ) : (
          <TouchableOpacity 
            style={{ width: 48, height: 48, justifyContent: 'center' }} 
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../assets/chevron-left.png')} 
              style={{ width: 30, height: 30, tintColor: Colors.black }}
            />
          </TouchableOpacity>
        )}

        <Text 
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: FontSize.large,
            fontWeight: '600',
            color: Colors.text,
            textTransform: 'uppercase',
          }} 
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        {showRight ? (
          <TouchableOpacity 
            style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'flex-end' }}
            onPress={onRightPress || (() => navigation.navigate(ROUTES.CART))}
          >
            {rightIcon ? (
              <Image 
                source={rightIcon} 
                style={{ width: rightIconSize, height: rightIconSize, tintColor: Colors.black }}
              />
            ) : (
              <CartIcon size={25} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'flex-end' }} />
        )}
      </View>
    </View>
  );
};

export default CommonHeader;

