import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing } from '../../theme/theme';

const HeroBanner = () => {
  return (
    <View style={{ backgroundColor: Colors.background, height: 180, position: 'relative', marginTop: Spacing.sm }}>
      <View style={{ paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, zIndex: 10 }}>
        <Text style={{ fontSize: FontSize.xlarge, color: Colors.text, fontWeight: '500', lineHeight: 28 }}>Planta - shining your</Text>
        <Text style={{ fontSize: FontSize.xlarge, color: Colors.text, fontWeight: '500', lineHeight: 28 }}>little space</Text>
        
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: Spacing.lg }}>
          <Text style={{ fontSize: FontSize.regular, color: Colors.primary, fontWeight: '500' }}>See New Arrivals</Text>
          <Image 
            source={require('../../assets/Vector1.png')} 
            style={{ width: 12, height: 12, marginLeft: 6, tintColor: Colors.primary }} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../../assets/herrobanner.png')}
        style={{ position: 'absolute', bottom: -15, right: -10, width: 320, height: 220, zIndex: 1 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default HeroBanner;
