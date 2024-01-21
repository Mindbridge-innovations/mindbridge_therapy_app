import { StyleSheet, View,Image,Text, TextInput,TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import CustomButton from "../assets/widgets/custom_button";


const SignUpScreen=()=>{
   
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone:'',
        password: '',
        password_confirm: '',

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
        <View style={{ flex: 1,justifyContent: 'space-around',fontSize:16, backgroundColor:'#1D29D0'}}>
            <View style={styles.container}>
            <Image
                source={require('./../assets/mindbridgelogo_splash.png')}
                style={styles.logoimage}
              />

             <Text style={{ paddingBottom:20, fontSize:20, color:'white', textTransform:'uppercase' }}>Sign Up</Text>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                />
              </View>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    keyboardType="phone-pad"
                />
              </View>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                />
              </View>

              <View style={{ display:'block',marginBottom:20 }}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry  
                />
              </View>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                    style={styles.input}
                    value={formData.password_confirm}
                    onChangeText={(text) => handleInputChange('password_confirm', text)}
                    secureTextEntry
                />
              </View>

              <CustomButton
                onPress={null}
                title="Sign Up"
                buttonStyle={{ backgroundColor: 'black', width:300 }}
                textStyle={{ color: 'white' }}
            />
            </View>

        </View>

      );
    
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        alignItems:'center',
    },
  
    logoimage: {
      width: 100,
      height: 80,
      resizeMode: 'cover', // or 'contain', 'stretch', 'center'
      borderRadius: 10, // if you want to add borderRadius
      marginBottom:20
    },
    label:{
        color:'white',
        marginBottom:10,
    },

    input:{
        backgroundColor:'#040C87',
        borderRadius:15,
        width:Dimensions.get('window').width*0.8,
        color:'gray'
    }

    
    
  });
  