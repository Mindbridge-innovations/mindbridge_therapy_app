import { StyleSheet, View,Image,Text, TextInput,TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import CustomButton from "../assets/widgets/custom_button";
import { ScrollView } from "react-native-gesture-handler";
import mystyles from "../assets/stylesheet";


const SignInScreen=()=>{
   
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
    
      const handleSubmit = () => {
        // Handle form submission logic
        console.log('Form submitted:', formData);
      };

      return(
        <ScrollView contentContainerStyle={{ flexGrow:1,backgroundColor:'#255ECC' }}>
        <View style={{ flex: 1,justifyContent: 'space-around',fontSize:16}}>
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
                onPress={null}
                title="Sign In"
                buttonStyle={{ backgroundColor: 'black', width:300, marginTop:30, height:50}}
                textStyle={{ color: 'white' }}
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
  