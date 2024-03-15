import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../assets/widgets/custom_button';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import mystyles from '../assets/stylesheet';
import {useNavigation} from '@react-navigation/native';
import Config from '../config';
// imports for register with firebae email and password
import {auth} from '../firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [selectedRole, setSelectedRole] = useState(''); // Set the initial selected value

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    password_confirm: '',
    role: '',
  });

  const payload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    // Include additional fields as required by your backend
    firstName: formData.firstName, // Replace with actual field if needed
    lastName: formData.lastName, // Replace with actual field if needed
    phoneNumber: formData.phoneNumber,
    role: formData.role,
  };

  const handleRoleChange = role => {
    setSelectedRole(role);
    setFormData({
      ...formData,
      role: role, // Update the role in formData
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (formData.password != formData.password_confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      // Replace 'http://your-backend-url.com' with your actual backend URL
      const response = await fetch(`${Config.BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert(
          'Registration successful, please check your email for confirmation',
        );
        // navigation.navigate('OnBoardQtnsScreen', { role: selectedRole });
      } else {
        // Handle errors
        alert(result.message);
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred: ' + error.message);
    }

    // trying email and password signup with firebase
    // createUserWithEmailAndPassword(auth, formData.email, formData.password)
    // .then((userCredential) => {
    //     // Registered
    //     const user = userCredential.user;
    //     updateProfile(user, {
    //         photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
    //     })
    //     .then(() => {
    //         alert('Registered, please login.');
    //     })
    //     .catch((error) => {
    //         alert(error.message);
    //     })
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(errorMessage);
    // });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
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

          <View style={{display: 'block', marginBottom: 20}}>
            <Text style={mystyles.label}>First Name (optional)</Text>
            <TextInput
              style={mystyles.input}
              value={formData.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
            />
          </View>

          <View style={{display: 'block', marginBottom: 20}}>
            <Text style={mystyles.label}>Last Name (optional)</Text>
            <TextInput
              style={mystyles.input}
              value={formData.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
            />
          </View>

          <View style={{display: 'block', marginBottom: 20}}>
            <Text style={mystyles.label}>Email address</Text>
            <TextInput
              style={mystyles.input}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          <View style={{display: 'block', marginBottom: 20}}>
            <Text style={mystyles.label}>Phone number</Text>
            <TextInput
              style={mystyles.input}
              value={formData.phoneNumber}
              onChangeText={text => handleInputChange('phoneNumber', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{display: 'block', marginBottom: 20}}>
            <Text style={mystyles.label}>Username</Text>
            <TextInput
              style={mystyles.input}
              value={formData.username}
              onChangeText={text => handleInputChange('username', text)}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={mystyles.label}>Password</Text>
            <TextInput
              style={mystyles.input}
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              secureTextEntry
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={mystyles.label}>Confirm password</Text>
            <TextInput
              style={mystyles.input}
              value={formData.password_confirm}
              onChangeText={text => handleInputChange('password_confirm', text)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputcontainer}>
            <Text
              style={{marginVertical: 20, color: 'white', fontWeight: 'bold'}}>
              Select your role for which you are registering
            </Text>
            <View style={mystyles.picker}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) =>
                  handleRoleChange(itemValue)
                }>
                <Picker.Item label="Choose your role" value="" />
                <Picker.Item label="Patient" value="Patient" />
                <Picker.Item label="Therapist" value="Therapist" />
              </Picker>
            </View>
          </View>

          <CustomButton
            onPress={handleSubmit}
            title="Sign Up"
            buttonStyle={{backgroundColor: 'black', width: 300, marginTop: 40}}
            textStyle={{color: 'white'}}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: -30}}>
          <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold'}}>
            Already having an account?{' '}
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
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
