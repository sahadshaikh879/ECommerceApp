import React, {createContext, useContext, useState, ReactNode, useCallback, useRef} from 'react';
import {View, Text, Animated, TouchableOpacity, Dimensions} from 'react-native';
import { Colors } from '../theme/theme';

interface SnackbarContextType {
    showSnackbar: (
        message: string,
        type?: 'default' | 'success' | 'error' | 'warning' | 'info',
        position?: 'top' | 'bottom'
    ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

const { width } = Dimensions.get('window');

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('default');
    const [position, setPosition] = useState<'top' | 'bottom'>('top');
    
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-100)).current;

    const showSnackbar = useCallback((msg: string, t: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default', pos: 'top' | 'bottom' = 'top') => {
        setMessage(msg);
        setType(t);
        setPosition(pos);
        setVisible(true);

        // Reset positions
        translateY.setValue(pos === 'top' ? -100 : 100);
        
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();

        // Auto hide
        setTimeout(() => {
            hideSnackbar();
        }, 3000);
    }, []);

    const hideSnackbar = useCallback(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: position === 'top' ? -100 : 100,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setVisible(false);
        });
    }, [position]);

    const getBgColor = () => {
        switch (type) {
            case 'success': return Colors.primary;
            case 'error': return Colors.error;
            case 'warning': return Colors.warning;
            case 'info': return Colors.info;
            default: return Colors.dark;
        }
    };

    return (
      <SnackbarContext.Provider value={{ showSnackbar }}>
        {children}
        {visible && (
            <Animated.View 
                style={{
                    position: 'absolute',
                    left: '5%',
                    right: '5%',
                    width: '90%',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 9999,
                    elevation: 10,
                    shadowColor: Colors.black,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    top: position === 'top' ? 60 : undefined,
                    bottom: position === 'bottom' ? 60 : undefined,
                    backgroundColor: getBgColor(),
                    opacity,
                    transform: [{ translateY }]
                }}
            >
                <Text style={{
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: '500',
                    flex: 1,
                }}>{message}</Text>
                <TouchableOpacity onPress={hideSnackbar}>
                    <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 12,
                    }}>
                        <Text style={{
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: '700',
                        }}>X</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )}
      </SnackbarContext.Provider>
    );
}

export default SnackbarProvider;
