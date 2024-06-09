import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Touchable
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomButton from '../assets/utils/custom_button';
import {ScrollView, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import mystyles from '../assets/stylesheet';
import {useNavigation} from '@react-navigation/native';
import Config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../utils/contexts/userContext';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { Toast } from 'react-native-toast-notifications';
import PasswordInput from '../assets/reusablecomponents/passwordInput';



const SignInScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const { setUser,setIsAuthenticated } = useContext(UserContext);

  const sheetRef = useRef(null);

  // State to manage password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
 // Toggle password visibility
 const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};

const { isAuthenticated } = useContext(UserContext);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
        console.log("User is authenticated, navigating to DashboardDrawer");
        navigation.navigate('DashboardDrawer');
    }
}, [isAuthenticated, navigation]);

  const handleSubmit = async () => {
    Keyboard.dismiss();  // Dismiss the keyboard programmatically
    setIsLoading(true)

    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      

      if (response.ok) {
        if(result.userData.role==="admin"){
          Toast.show("Admins can not sign into the app, please use the web system", {
            type: "warning",
            placement: "top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          setIsLoading(false)
          return null;
  
        }
        // Handle successful login
        // Save the token, navigate to the dashboard, etc.
        const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 7 days from now
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem(
          'tokenExpiration',
          expirationTime.toString(),
        );
        setUser(result.userData);
        console.log(result.userData)
        setIsAuthenticated(true);
       
        Toast.show("You have been successfully logged in!", {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        // match the user after successful login, so long as they are not matched and are clients
        if(result.userData.isMatched==="false"){
        const matchingResponse = await fetch(`${Config.BACKEND_API_URL}/match`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        const matchingResult = await matchingResponse.json();
  
        if (matchingResponse.ok) {
          // Handle successful matching
          Toast.show("You have been matched successfully with a therapist!", {
            type: "success",
            placement: "top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        } else {
          //handle matching errors
          Toast.show(matchingResult.message, {
            type: "success",
            placement: "top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardDrawer' }],
      });
      } else {
        // Handle errors
        Toast.show(result.message, {
          type: "error",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } catch (error) {client
      Toast.show(error.message, {
        type: "error",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    setIsLoading(false)



  };

// PASSWORD RESET SUBMISSION LOGIC IS BELOW
  const handlePasswordResetRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Password reset link sent! Check your email.');
        sheetRef.current?.close(); // Close the bottom sheet
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        // Remove the token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        console.error('Error removing user token:', error);
        // Handle error (optional)
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
    <TouchableWithoutFeedback>
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#255ECC'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          fontSize: 16,
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <Image
            source={require('./../assets/mindbridgelogo_splash.png')}
            style={mystyles.logoimage}
          />

          <Text
            style={{
              paddingBottom: 80,
              fontSize: 20,
              color: 'white',
              textTransform: 'uppercase',
            }}>
            Sign In
          </Text>

          <View style={{marginBottom: 30}}>
            <Text style={mystyles.label}>Email address</Text>
            <TextInput
              style={mystyles.input}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginBottom: 30 }}>
              <Text style={mystyles.label}>Password</Text>
              <PasswordInput
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
              />
            </View>
          
          <CustomButton
            onPress={handleSubmit}
            title="Sign In"
            buttonStyle={{
              backgroundColor: 'black',
              width: 300,
              marginTop: 20,
              height: 50,
            }}
            textStyle={{color: 'white'}}
            isLoading={isLoading}
          />

          
        </View>

        <View style={{flexDirection: 'row', marginTop: -40}}>
          <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold'}}>
            Have no active account?{' '}
          </Text>
          <CustomButton
            onPress={() => navigation.navigate('SignUpScreen')}
            title="Sign up"
            buttonStyle={{backgroundColor: 'transparent'}}
            textStyle={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: -40}}>
          <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold'}}>
            Forgot your password?{' '}
          </Text>
          <CustomButton
            onPress={() => sheetRef.current?.open()}
            title="Reset password"
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
    </TouchableWithoutFeedback>
    {/* BOTTOM SHEET TO DISPLAY EMAIL ENTERING FOR RESETTING PASSWORD */}
    <BottomSheet ref={sheetRef}>
    <View style={{paddingHorizontal:20, alignItems:'center'}}>
            <Text>Enter the email address used for creating the account</Text>
            <TextInput
              style={{backgroundColor: 'lightgray',borderRadius: 10,width: Dimensions.get('window').width * 0.8,color: 'black',fontSize:16, marginTop:30}}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              keyboardType="email-address"
              placeholder='Enter account email'
            />
            <CustomButton
            onPress={handlePasswordResetRequest}
            title="Request reset link"
            buttonStyle={{backgroundColor: 'black', margin:40, width:'70%'}}
            textStyle={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
          </View>
  </BottomSheet>
  </>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    marginBottom:20,
  },
});
