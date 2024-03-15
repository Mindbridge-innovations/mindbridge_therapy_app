import { StyleSheet, View,Image,Text, TextInput,TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import CustomButton from "../assets/widgets/custom_button";
import { ScrollView } from "react-native-gesture-handler";
import mystyles from "../assets/stylesheet";
import { useNavigation } from "@react-navigation/native";
import Config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen=()=>{
  const navigation=useNavigation();
   
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
    
      const handleSubmit = async () => {
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
            // Handle successful login
            alert('You have been logged in successfully!')
            // console.log('Login successful:', result);
          
            // Save the token, navigate to the dashboard, etc.
            // For example, if using AsyncStorage to store the token:
            // await AsyncStorage.setItem('userToken', result.token);
            const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
            await AsyncStorage.setItem('userToken', result.token);
            await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
        
            navigation.navigate('DashboardDrawer');
          } else {
            // Handle errors
            alert(result.message);
          }
        } catch (error) {

          alert('An error occurred: ' + error.message);
        }

        // signInWithEmailAndPassword(auth, formData.email, formData.password)
        // .then((userCredential) => {
        //   navigation.navigate('Chat');
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   alert(errorMessage);
        // });
      };

      return(
        <ScrollView contentContainerStyle={{ flexGrow:1,backgroundColor:'#255ECC' }}>
        <View style={{ flex: 1,justifyContent: 'space-around',fontSize:16, alignItems:'center'}}>
            <View style={styles.container}>
            <Image
                source={require('./../assets/mindbridgelogo_splash.png')}
                style={mystyles.logoimage}
              />

             <Text style={{ paddingBottom:80, fontSize:20, color:'white', textTransform:'uppercase' }}>Sign In</Text>

              <View style={{  marginBottom:30 }}>
                <Text style={mystyles.label}>Email address</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                />
              </View>

    

              <View style={{marginBottom:30 }}>
                <Text style={mystyles.label}>Password</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry  
                />
              </View>


              <CustomButton
                onPress={handleSubmit}
                title="Sign In"
                buttonStyle={{ backgroundColor: 'black', width:300, marginTop:20, height:50}}
                textStyle={{ color: 'white' }}
            />
            </View>

            <View style={{ flexDirection:'row', marginTop:-40 }}>
                <Text style={{ color:'white', marginTop:10 , fontWeight:'bold'}}>Have no active account? </Text>
                <CustomButton
                onPress={()=>navigation.navigate('SignUpScreen')}
                title="Sign up"
                buttonStyle={{ backgroundColor: 'transparent' }}
                textStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
                />
              </View>

              <View style={{ flexDirection:'row', marginTop:-40 }}>
                <Text style={{ color:'white', marginTop:10 , fontWeight:'bold'}}>Forgot your password? </Text>
                <CustomButton
                onPress={()=>navigation.navigate('DashboardDrawer')}
                title="Reset password"
                buttonStyle={{ backgroundColor: 'transparent' }}
                textStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
                />
              </View>
        </View>

        
        </ScrollView>

      );
    
}
export default SignInScreen;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        alignItems:'center',
    },
  
    
    

   

    
    
  });
  