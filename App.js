
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useRef,useContext} from 'react';
import queryString from 'query-string';
import {Dimensions, Linking, Platform} from 'react-native';
import VideoCallPage from './components/VideoCall';
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
import TherapistListScreen from './components/dashboard_components/mytherapists';
import PatientListScreen from './components/dashboard_components/mypatients';
import TherapistDetailsScreen from './components/dashboard_components/therapist_details';
import AppointmentBookingScreen from './components/dashboard_components/bookappointment';
import ChatScreen from './components/dashboard_components/ChatScreen';
import VoiceCallPage from './components/dashboard_components/VoiceCall';
import PatientDetailsScreen from './components/dashboard_components/patient_details';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Config from './config';
import RateTherapistScreen from './components/dashboard_components/ratingForm';
import FeedbackForm from './components/dashboard_components/feedbackForm';
import ResetPasswordScreen from './components/resetPassword';
import { ToastProvider } from 'react-native-toast-notifications'
import WebViewScreen from './components/dashboard_components/WebViewScreen';
import TokenDisplayScreen from './components/dashboard_components/tokenDisplayScreen';
import DashboardDrawer from './components/dashboard_components/DashboardDrawer';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const linking = {
  prefixes: ['videocall://'],
  config: {
    screens: {
      DashboardDrawer: '/',
      ResetPassword: 'reset-password?token=:token'
    },
  },
};


//the root of the app where it starts loading from
export default function App() {
  const navigationRef = useRef();
  const routeNameRef = useRef();


  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(Config.ONESIGNAL_APP_ID);

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Handle deep linking
  useEffect(() => {
  const handleDeepLink = event => {
    const parsedUrl = queryString.parseUrl(event.url);
    const path = parsedUrl.url.split('://')[1];
    const params = parsedUrl.query;

    //navigation technique from deep link to the reset password screen
    if (path.includes('reset-password')) {
      const { token, email } = params; // Extract both token and email
      if (token && email && navigationRef.current) {
        navigationRef.current.navigate('ResetPassword', { token, email });
      }
    }
  };

  Linking.addEventListener('url', handleDeepLink);
  Linking.getInitialURL().then(url => {
    if (url) handleDeepLink({ url });
  });

  return ()  => {
    Linking.removeEventListener('url', handleDeepLink);
  };
}, []);

  useEffect(() => {
    // registerNotificationHandlers(navigationRef.current);
    // checkInitialNotification(navigationRef.current);
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

  
  
  function navigateToVideoCall(callId) {
    // Navigate to the VideoCallPage with the callId
    props.navigation.navigate('VideoCallPage', { callId });
  }

  return (
    <ToastProvider>
    <SafeAreaView style={{flex:1}}>
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
           <UserProvider>
        {isLoading ? (
          <SplashScreen />
        ) : (
          // define the navigation stack below
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="MyTherapists" component={TherapistListScreen} />
            <Stack.Screen name="MyPatients" component={PatientListScreen} />
            <Stack.Screen name="OnBoardQtnsScreen" component={OnBoardQtnsScreen}/>
            <Stack.Screen name="TherapistDetailsScreen" component={TherapistDetailsScreen}/>
            <Stack.Screen name="AppointmentBookingScreen" component={AppointmentBookingScreen}/>
            <Stack.Screen name="DashboardDrawer" component={DashboardDrawer} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }}/>
            <Stack.Screen name="VoiceCall" component={VoiceCallPage}/>
            <Stack.Screen name="PatientDetailsScreen" component={PatientDetailsScreen}/>
            <Stack.Screen name="Rating" component={RateTherapistScreen}/>
            <Stack.Screen name="Feedback" component={FeedbackForm}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name="TokenDisplay" component={TokenDisplayScreen} />
          </Stack.Navigator>
        )}
        </UserProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    </SafeAreaView>
    </ToastProvider>
  );
}
