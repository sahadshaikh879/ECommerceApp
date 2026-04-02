import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, FontSize, Spacing } from '../../theme/theme';

interface HomeSectionHeaderProps {
  title: string;
  onPressViewAll: () => void;
}

const HomeSectionHeader: React.FC<HomeSectionHeaderProps> = ({ title, onPressViewAll }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.sm,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '500', color: Colors.text }}>{title}</Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={onPressViewAll}
      >
        <Text style={{ fontSize: FontSize.regular, color: Colors.accent, fontWeight: '500' }}>
          View all
        </Text>
        <Image
          source={require('../../assets/Vector1.png')}
          style={{
            width: 12,
            height: 12,
            marginLeft: 6,
            tintColor: Colors.accent,
            transform: [{ rotate: '0deg' }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeSectionHeader;

