import { NavigationContainer, useNavigation} from '@react-navigation/native';
import React from "react";
import { Button, Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import VideoCallPage from './components/callpage';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './components/splash_screen';
import { useState,useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SignUpScreen from './components/signup';
import SignInScreen from './components/signin';
import HomePage from './components/HomePage';



const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust the time as needed
  }, []);
  return (
    <GestureHandlerRootView style={{ flex:1, }}>
      <NavigationContainer>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}

