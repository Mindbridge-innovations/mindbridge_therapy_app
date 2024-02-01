import { NavigationContainer, useNavigation} from '@react-navigation/native';
import React from "react";
import VideoCallPage from './components/callpage';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './components/splash_screen';
import { useState,useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUpScreen from './components/signup';
import SignInScreen from './components/signin';
import HomePage from './components/HomePage';
import OnBoardQtnsScreen from './components/onboard_qtns_screen';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './components/Dashboard';
import SettingScreen from './components/profile';
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();
const Drawer=createDrawerNavigator();

const DashboardDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Appointments" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Appointments" component={DashboardScreen} />
      <Drawer.Screen name="My patients" component={DashboardScreen} />
      <Drawer.Screen name="Feedback/review" component={DashboardScreen} />
      <Drawer.Screen name="My therapists" component={DashboardScreen} />
      <Drawer.Screen name="Profile" component={SettingScreen} />
      <Drawer.Screen name="Resource Library" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom content at the top of the drawer */}
      <Image
        source={require('./assets/mindbridgelogo_splash.png')}
        style={{ height: 150, resizeMode: 'cover' }}
      />
      {/* Default drawer items */}
      <DrawerItem
        label="Appointments"
        onPress={() => props.navigation.navigate('Appointments')}
      />
      <DrawerItem
        label="My patients"
        onPress={() => props.navigation.navigate('My patients')}
      />
      <DrawerItem
        label="Feedback/review"
        onPress={() => props.navigation.navigate('Feedback/review')}
      />
      <DrawerItem
        label="My therapists"
        onPress={() => props.navigation.navigate('My therapists')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Resource Library"
        onPress={() => props.navigation.navigate('Resource Library')}
      />
      {/* Signout button at the bottom */}
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          // Handle sign out action here
        }}
      />
    </DrawerContentScrollView>
  );
};


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
            <Stack.Screen name="OnBoardQtnsScreen" component={OnBoardQtnsScreen} />
            <Stack.Screen name="DashboardDrawer" component={DashboardDrawer} />


          </Stack.Navigator>
        )}
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}

