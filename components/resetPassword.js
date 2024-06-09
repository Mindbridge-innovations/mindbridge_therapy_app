import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import Config from '../config';
import CustomButton from '../assets/utils/custom_button';
import mystyles from '../assets/stylesheet';
import { Toast } from 'react-native-toast-notifications';

const ResetPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token,email } = route.params;


  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log(email,token)
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
      
        Toast.show("Success:", result.message,{
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate('SignInScreen'); // Navigate to login screen
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      Toast.show("Error resetting password:", error.message,{
        type: "success",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#255ECC'}}>
        <View style={{ padding: 20, alignContent:'center' }}>
        <View style={{marginBottom: 30}}>
            <Text style={mystyles.label}>Enter new password</Text>
            <TextInput
            secureTextEntry
                style={mystyles.dashinput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder='Enter new password'
            />
        </View>

        <View style={{marginBottom: 30}}>
            <Text style={mystyles.label}>Confirm new password</Text>
            <TextInput
            secureTextEntry
                style={mystyles.dashinput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder='Confirm password'
            />
        </View>
        <CustomButton
        onPress={handleResetPassword}
        title="Reset password"
        buttonStyle={{
            backgroundColor: 'black',
            width: 300,
            marginTop: 20,
            height: 50,
        }}
        textStyle={{color: 'white'}}
        />   
        </View>
     </ScrollView>
  );
};

export default ResetPasswordScreen;