import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import CustomButton from '../assets/utils/custom_button';
import {ScrollView} from 'react-native-gesture-handler';
import mystyles from '../assets/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomePage(props) {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const expiration = await AsyncStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (token && expiration && currentTime < parseInt(expiration)) {
        // Token exists and has not expired, navigate to the dashboard
        navigation.navigate('DashboardDrawer');
      }
      // If there's no token or it's expired, stay on the HomePage
    } catch (e) {
      console.error('Error reading token or expiration:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={mystyles.containerview}>
      <View style={{marginHorizontal: 20, alignItems: 'center'}}>
        {/* <Button title="Make Video Call" onPress={() => { navigation.navigate('VideoCallPage') }} /> */}
        <Image
          source={require('./../assets/mindbridgelogo_splash.png')}
          style={mystyles.logoimage}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 5,
          }}>
          Book appointments in no time.
        </Text>
        <Text
          style={{
            color: 'white',
            marginVertical: 20,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Send text, audio, and video messages from anywhere at anytime.
          Guaranteed daily responses 5 days per week.
        </Text>
        <Image
          source={require('./../assets/images/welcomeimage.png')}
          style={styles.welimage}
        />
        <CustomButton
          onPress={() => navigation.navigate('SignUpScreen')}
          title="Get started"
          buttonStyle={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 15,
            width: 250,
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />

        <View style={{flexDirection: 'row', marginTop: -40}}>
          <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold'}}>
            Already signed up?{' '}
          </Text>
          <CustomButton
            onPress={() => navigation.navigate('SignInScreen')}
            title="Sign in"
            buttonStyle={{backgroundColor: 'transparent'}}
            textStyle={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    backgroundColor: '#1D29D0',
  },

  welimage: {
    width: Dimensions.get('window').width * 0.7,
    height: 300,
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
    borderRadius: 10, // if you want to add borderRadius
  },
  button: {
    textAlign: 'center',
  },
});

/* <Stack.Navigator initialRouteName="HomePage">  */
