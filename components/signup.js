import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import CustomButton from '../assets/utils/custom_button';
import { Picker } from '@react-native-picker/picker';
import mystyles from '../assets/stylesheet';
import { useNavigation } from '@react-navigation/native';
import validateInput from '../assets/utils/validateInput'; // Make sure this path is correct
import { Toast } from 'react-native-toast-notifications';
import PasswordInput from '../assets/reusablecomponents/passwordInput';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [selectedRole, setSelectedRole] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    password_confirm: '',
    role: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    username:'',
    password: '',
    password_confirm: '',
  });

  const handleNext = () => {
    // Check for any errors or empty required fields
    const hasErrors = Object.values(errors).some(error => error !== '');
    const requiredFields = ['email', 'phoneNumber', 'username', 'password', 'password_confirm', 'role'];
    const hasEmptyFields = requiredFields.some(field => !userData[field]);

    if (hasErrors || hasEmptyFields) {
      Toast.show('Please fill the fields correctly before submitting.', {
        type: "warning",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
        return;
    }

    // If all validations are passed, navigate to the next screen
    navigation.navigate('OnBoardQtnsScreen', { userData, source:"SignUpScreen" });
};

//validate role selection here, making sure role is not null
const handleRoleChange = (role) => {
  setSelectedRole(role);
  setUserData({
    ...userData,
    role: role,
  });

  let error = '';
  if (!validateInput(role, 'picker')) {
      error = 'Please select a role.';
  }

  setErrors(prevErrors => ({
    ...prevErrors,
    role: error,
  }));
};


//validate other input fields making sure they follow the validation rules
  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });

    let error = '';
   
    switch (field) {
      case 'email':
        if (!validateInput(value, 'email')) {
          error = 'Please enter a valid email address.';
        }
        break;
        case 'role':
          if (!validateInput(value, 'picker')) {
            error = 'Please select a role.';
          }
          break;
      case 'phoneNumber':
        if (!validateInput(value, 'phone')) {
          error = 'Please enter a valid phone number.Include country code eg 256 for uganda';
        }
        break;
      case 'password':
        if (!validateInput(value, 'password')) {
          error = 'Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character.';
        }
        break;
        case 'username':
        if (!validateInput(value, 'username')) {
          error = 'Username must be 3-15 characters long and can only contain letters, numbers, and underscores.';
        }
        break;
      case 'password_confirm':
        if (value !== userData.password) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View
        style={{
          justifyContent: 'space-around',
          fontSize: 16,
          backgroundColor: '#255ECC',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <Image
            source={require('./../assets/mindbridgelogo_splash.png')}
            style={mystyles.logoimage}
          />

          <Text
            style={{
              paddingBottom: 20,
              fontSize: 20,
              color: 'white',
              textTransform: 'uppercase',
            }}>
            Sign Up
          </Text>

          {/* Input fields with validation */}
          {['firstName', 'lastName', 'email', 'phoneNumber', 'username'].map((field, index) => (
            <View key={index} style={{ display: 'block', marginBottom: 20 }}>
              <Text style={mystyles.label}>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
              <TextInput
                style={mystyles.input}
                value={userData[field]}
                onChangeText={text => handleInputChange(field, text)}
                secureTextEntry={field.includes('password')}
                keyboardType={field === 'email' ? 'email-address' : field === 'phoneNumber' ? 'phone-pad' : 'default'}
              />
              {errors[field] ? <Text style={{ color: 'red' }}>{errors[field]}</Text> : null}
            </View>
          ))}
          {/* password input field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={mystyles.label}>Password</Text>
            <PasswordInput
              value={userData.password}
              onChangeText={text => handleInputChange('password', text)}
            />
            {errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}
          </View>

            {/* confirm password input field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={mystyles.label}>Confirm Password</Text>
            <PasswordInput
              value={userData.password_confirm}
              onChangeText={text => handleInputChange('password_confirm', text)}
            />
            {errors.password_confirm ? <Text style={{ color: 'red' }}>{errors.password_confirm}</Text> : null}
          </View>

          <View style={styles.inputcontainer}>
            <Text
              style={{ marginVertical: 20, color: 'white', fontWeight: 'bold' }}>
              Select your role for which you are registering
            </Text>
            <View style={mystyles.picker}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) =>
                  handleRoleChange(itemValue)
                }>
                <Picker.Item label="Choose your role" value="" />
                <Picker.Item label="Client" value="client" />
                <Picker.Item label="Therapist doctor" value="therapist" />
              </Picker>
            </View>

          </View>
          {errors.role ? <Text style={{ color: 'red' }}>{errors.role}</Text> : null}


          <CustomButton
            onPress={handleNext}
            title="Next"
            buttonStyle={{ backgroundColor: 'black', width: 300, marginTop: 40 }}
            textStyle={{ color: 'white' }}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: -30 }}>
          <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold' }}>
            Already having an account?{' '}
          </Text>
          <CustomButton
            onPress={() => navigation.navigate('SignInScreen')}
            title="Sign in"
            buttonStyle={{ backgroundColor: 'transparent' }}
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
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
});