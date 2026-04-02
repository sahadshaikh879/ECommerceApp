import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../utils/constants/routes';
import { useAppDispatch } from '../redux/hooks';
import { loadFavorites } from '../redux/slices/productSlice';
import { loadCart } from '../redux/slices/cartSlice';
import { Colors } from '../theme/theme';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.1)).current;

    useEffect(() => {
        // Start initial data loading
        dispatch(loadFavorites());
        dispatch(loadCart());

        // Run animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();

        // Navigate to Home after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Animated.Image
                source={require('../assets/logo.png')}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
    },
});

export default SplashScreen;
