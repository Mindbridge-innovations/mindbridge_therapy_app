import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import queryString from 'query-string';
import {Linking, Platform} from 'react-native';
import VideoCallPage from './components/callpage';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './components/splash_screen';
import {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SignUpScreen from './components/signup';
import SignInScreen from './components/signin';
import HomePage from './components/HomePage';
import UserProvider from './utils/contexts/userProvider';
import OnBoardQtnsScreen from './components/onboard_qtns_screen';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import DashboardScreen from './components/Dashboard';
import SettingScreen from './components/profile';
import {Image} from 'react-native';
import TherapistListScreen from './components/dashboard_components/mytherapists';
import PatientListScreen from './components/dashboard_components/mypatients';
import TherapistDetailsScreen from './components/dashboard_components/therapist_details';
import AppointmentBookingScreen from './components/dashboard_components/bookappointment';
import AppointmentManagementScreen from './components/dashboard_components/Appointments';
import AppointmentDetailsScreen from './components/dashboard_components/appointment_details';
// import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ChatScreen from './components/dashboard_components/ChatScreen';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {auth, db} from './firebaseConfig';
import {Text} from 'react-native-elements';

// ... other imports

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const linking = {
  prefixes: ['videocall://'],
  config: {
    screens: {
      DashboardDrawer: '/',
    },
  },
};

const DashboardDrawer = () => {
  return (
    // main drawer navigator
    <Drawer.Navigator
      initialRouteName="Appointments"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {backgroundColor: '#ADD8E6', width: 250},
        drawerActiveBackgroundColor: 'blue',
      }}>
      <Drawer.Screen
        name="Appointments"
        component={AppointmentManagementScreen}
      />
      <Drawer.Screen name="My patients" component={PatientListScreen} />
      <Drawer.Screen name="Feedback/review" component={DashboardScreen} />
      <Drawer.Screen name="My therapists" component={TherapistListScreen} />
      <Drawer.Screen name="Profile" component={SettingScreen} />
      <Drawer.Screen name="Resource Library" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};
const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom content at the top of the drawer */}
      <Image
        source={require('./assets/mindbridgelogo_splash.png')}
        style={{height: 150, resizeMode: 'cover', width: 250}}
      />

      {/* Default drawer items */}
      <DrawerItem
        label="Appointments"
        onPress={() => props.navigation.navigate('Appointments')}
        icon={() => <FontAwesomeIcon name="calendar" size={20} color="#000" />} // Replace with your desired icon
      />
      <DrawerItem
        label="My patients"
        onPress={() => props.navigation.navigate('My patients')}
        icon={() => (
          <FontAwesome6 name="hospital-user" size={20} color="#000" />
        )} // Replace with your desired icon
      />
      <DrawerItem
        label="Feedback/review"
        onPress={() => props.navigation.navigate('Feedback/review')}
        icon={() => <MaterialIcons name="reviews" size={20} color="#000" />} // Replace with your desired icon
      />
      <DrawerItem
        label="My therapists"
        onPress={() => props.navigation.navigate('My therapists')}
        icon={() => <FontAwesome6 name="user-doctor" size={20} color="#000" />} // Replace with your desired icon
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
        icon={() => <AntDesignIcon name="profile" size={20} color="#000" />} // Replace with your desired icon
      />
      <DrawerItem
        label="Resource Library"
        onPress={() => props.navigation.navigate('Resource Library')}
        icon={() => <IoniconsIcon name="library" size={20} color="#000" />} // Replace with your desired icon
      />
      {/* Signout button at the bottom */}
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          // Handle sign out action here
        }}
        icon={() => <FontAwesomeIcon name="sign-out" size={20} color="#000" />} // Replace with your desired icon
      />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const [isLoading, setIsLoading] = useState(true);

  // Handle deep linking
  useEffect(() => {
    const handleDeepLink = event => {
      const parsedUrl = queryString.parseUrl(event.url);
      const path = parsedUrl.url.split('://')[1];
      const params = parsedUrl.query;

      if (path === 'confirm' && params && params.email) {
        // Make sure the navigation container is ready before navigating
        if (navigationRef.current && routeNameRef.current) {
          navigationRef.current.navigate('SignInScreen', {email: params.email});
        }
      }
    };

    // Listen for incoming links
    Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened by a deep link
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    // Return the cleanup function
    return () => {
      // Clean up the event listener
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust the time as needed

    // Return the cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          // Ensure that the navigation container is mounted
          if (navigationRef.current) {
            // Get the current route
            const currentRoute = navigationRef.current.getCurrentRoute();

            // Check if the current route is defined
            if (currentRoute) {
              // Set the current route name
              routeNameRef.current = currentRoute.name;
            }
          }
        }}>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen
              name="OnBoardQtnsScreen"
              component={OnBoardQtnsScreen}
            />
            <Stack.Screen
              name="TherapistDetailsScreen"
              component={TherapistDetailsScreen}
            />
            <Stack.Screen
              name="AppointmentBookingScreen"
              component={AppointmentBookingScreen}
            />
            <Stack.Screen name="DashboardDrawer" component={DashboardDrawer} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen
              name="AppointmentDetailsScreen"
              component={AppointmentDetailsScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
    </UserProvider>
  );
}
