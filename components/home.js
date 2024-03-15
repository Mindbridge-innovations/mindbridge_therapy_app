import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';
import VideoCallPage from './components/callpage';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './components/splash_screen';
import {useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function HomePage(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Button
        title="Make Video Call"
        onPress={() => {
          navigation.navigate('VideoCallPage');
        }}
      />
    </View>
  );
}

/* <Stack.Navigator initialRouteName="HomePage">  */
