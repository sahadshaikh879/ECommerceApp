import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import {Colors} from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {ROUTES} from '../utils/constants/routes';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SplashScreen from '../screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.subText,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopColor: Colors.border,
                    height: 60,
                    paddingBottom: 8,
                },
            }}>
            <Tab.Screen
                name={ROUTES.HOME}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}: {color: string}) => (
                        <Image
                            source={require('../assets/home.png')}
                            style={{width: 22, height: 22, tintColor: color}}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTES.CART}
                component={CartScreen}
                options={{
                    tabBarIcon: ({color}: {color: string}) => (
                        <Image
                            source={require('../assets/cart.png')}
                            style={{width: 22, height: 22, tintColor: color}}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTES.WISHLIST}
                component={WishlistScreen}
                options={{
                    tabBarIcon: ({color}: {color: string}) => (
                        <Image
                            source={require('../assets/heart.png')}
                            style={{width: 22, height: 22, tintColor: color}}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTES.PROFILE}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color}: {color: string}) => (
                        <Image
                            source={require('../assets/account.png')}
                            style={{width: 22, height: 22, tintColor: color}}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.SPLASH}>
                <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name={ROUTES.SHOP} component={ShopScreen} />
                <Stack.Screen name={ROUTES.PRODUCT_DETAIL} component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default AppNavigator;