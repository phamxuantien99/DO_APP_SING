import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './App/context/AuthContext';
import LoginScreen from './App/Screens/LoginScreen/LoginScreen';
import SplashScreen from './App/Screens/SplashScreen/SplashScreen';
import TabNavigation from './App/TabNavigation/TabNavigation';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar backgroundColor="#06bcee" />
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={TabNavigation} />
          </Stack.Navigator>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
