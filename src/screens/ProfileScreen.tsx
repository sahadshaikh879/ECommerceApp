import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CommonHeader from '../components/shared/CommonHeader';
import { Colors, Spacing, FontSize } from '../theme/theme';

const ProfileScreen = () => {
  const renderMenuItem = (label: string, isLast = false, isDestructive = false) => (
    <TouchableOpacity 
      style={{
        paddingVertical: 14,
        paddingHorizontal: Spacing.md,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'transparent',
      }}
    >
      <Text style={{
        fontSize: 16,
        color: isDestructive ? Colors.red : Colors.dark,
        fontWeight: isDestructive ? '600' : '500',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <CommonHeader title="PROFILE" hideBack={true} showRight={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginTop: 16, width: '100%' }}>
          <View style={{ width: 44, height: 44 }}>
            <Image 
              source={require('../assets/Avatar (1).png')} 
              style={{ width: '100%', height: '100%', borderRadius: 22 }} 
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.dark }}>Jane Cooper</Text>
            <Text style={{ fontSize: 14, color: Colors.subText, marginTop: 2 }}>jane@gmail.com</Text>
          </View>
        </View>

        {/* General Section */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 14, color: Colors.subText, paddingHorizontal: Spacing.md, marginBottom: 8 }}>General</Text>
          <View style={{ height: 1, backgroundColor: Colors.divider, marginHorizontal: Spacing.md, marginBottom: 4 }} />
          {renderMenuItem('Edit Profile')}
          {renderMenuItem('Planting Guide')}
          {renderMenuItem('Order History')}
          {renderMenuItem('FAQs', true)}
        </View>

        {/* Security Section */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 14, color: Colors.subText, paddingHorizontal: Spacing.md, marginBottom: 8 }}>Security</Text>
          <View style={{ height: 1, backgroundColor: Colors.divider, marginHorizontal: Spacing.md, marginBottom: 4 }} />
          {renderMenuItem('Change Password')}
          {renderMenuItem('Terms and Policy')}
          {renderMenuItem('Security Policy', true)}
        </View>

        {/* Logout Section */}
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          {renderMenuItem('Logout', true, true)}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;