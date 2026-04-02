import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SnackbarProvider } from './src/context/SnackbarProvider';
import { Colors } from './src/theme/theme';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <SnackbarProvider>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </KeyboardAvoidingView>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;