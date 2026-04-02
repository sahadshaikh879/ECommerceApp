import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, FontSize } from '../../theme/theme.ts';
import { ROUTES } from '../../utils/constants/routes';
import CartIcon from './CartIcon';

interface HomeHeaderProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ value, onChangeText }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  
  return (
    <View style={{ paddingTop: insets.top, backgroundColor: Colors.background }}>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 12, borderWidth: 1, borderColor: Colors.text, paddingHorizontal: Spacing.md, height: 45}}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.placeholderTextColor}
            style={{flex: 1, fontSize: FontSize.regular, color: Colors.text, paddingVertical: 0}}
            value={value}
            onChangeText={onChangeText}
          />
          <Image
            source={require('../../assets/search.png')}
            style={{width: 18, height: 18, tintColor: Colors.black}}
          />
        </View>
        <TouchableOpacity 
          style={{marginLeft: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => navigation.navigate('MainTabs', { screen: ROUTES.CART })}
        >
          <CartIcon size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;