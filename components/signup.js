import { StyleSheet, View,Image,Text, TextInput,TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import CustomButton from "../assets/widgets/custom_button";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import mystyles from "../assets/stylesheet";
import {  useNavigation} from '@react-navigation/native';



const SignUpScreen=()=>{
  const navigation = useNavigation();

   
  const [selectedRole, setSelectedRole] = useState(''); // Set the initial selected value

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
        navigation.navigate('OnBoardQtnsScreen', { role: selectedRole });

      };

      return(
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={{ justifyContent: 'space-around',fontSize:16, backgroundColor:'#255ECC'}}>
            <View style={styles.container}>
            <Image
                source={require('./../assets/mindbridgelogo_splash.png')}
                style={mystyles.logoimage}
              />

             <Text style={{ paddingBottom:20, fontSize:20, color:'white', textTransform:'uppercase' }}>Sign Up</Text>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={mystyles.label}>Email address</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                />
              </View>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={mystyles.label}>Phone number</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    keyboardType="phone-pad"
                />
              </View>

              <View style={{ display:'block', marginBottom:20 }}>
                <Text style={mystyles.label}>Username</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                />
              </View>

              <View style={{ marginBottom:20 }}>
                <Text style={mystyles.label}>Password</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry  
                />
              </View>

              <View style={{ marginBottom:20 }}>
                <Text style={mystyles.label}>Confirm password</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.password_confirm}
                    onChangeText={(text) => handleInputChange('password_confirm', text)}
                    secureTextEntry
                />
              </View>


              <View style={ styles.inputcontainer}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>Select your role for which you are registering</Text>
                <View style={mystyles.picker}>
                <Picker selectedValue={selectedRole} onValueChange={(itemValue, itemIndex) =>setSelectedRole(itemValue)} >
                  <Picker.Item label="Choose your role" value="" />
                  <Picker.Item label="Patient" value="Patient" />
                  <Picker.Item label="Therapist" value="Therapist" />
                  
                </Picker>
                </View>
              </View>


              <CustomButton
                onPress={handleSubmit}
                title="Sign Up"
                buttonStyle={{ backgroundColor: 'black', width:300 , marginTop:20}}
                textStyle={{ color: 'white' }}
            />
            </View>

        </View>
        </ScrollView> 

      );
    
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        alignItems:'center',
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
  