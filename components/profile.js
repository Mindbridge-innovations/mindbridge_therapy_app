import {View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import React, { useRef ,useState} from 'react';
import mystyles from '../assets/stylesheet';
import CustomButton from '../assets/utils/custom_button';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import { useContext } from 'react';
import UserContext from '../utils/contexts/userContext';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Config from '../config';
import { Toast } from 'react-native-toast-notifications';
import validateInput from '../assets/utils/validateInput';




function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const sheetRef = useRef(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [imageFile, setImageFile]=useState('');


  const handlePasswordChange = async () => {
    const body = JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword
  });
    
    const token = await AsyncStorage.getItem('userToken');
    try {
        const response = await fetch(`${Config.BACKEND_API_URL}/user/change-password`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: body
        });


        const result = await response.json();
        if (response.ok) {
            Toast.show("Your password has been updated successfully!", {
                type: "success",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            Toast.show(result.message, {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }
    } catch (error) {
        console.error('Error updating password:', error);
    }
};

  // function to select a profile image
  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true  // Include this line to get the image as base64
    }).then(image => {
      setProfileImage(image.path);
      // Set the image file for upload
      const imageForUpload = {
        uri: image.path,
        type: image.mime,  // mime type of the image
        name: `profile-${Date.now()}.${image.mime.split('/')[1]}`  // Construct a name for the file
      };
      setImageFile(imageForUpload);  // Assuming you have a state to hold this file
    }).catch(error => {
      console.log('Error selecting image: ', error);
    });
  };

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('username', username);
    formData.append('phoneNumber', phoneNumber);
  
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }
  
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        Toast.show(result.message, {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setPhoneNumber(user?.phoneNumber)
        setUsername(user?.username)
      } else {
        Toast.show(result.message, {
          type: "warning",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setPhoneNumber(user?.phoneNumber)
        setUsername(user?.username)
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  
  return (
    <>
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View>
        <Image
        source={profileImage ? { uri: profileImage } : require('./../assets/mindbridgelogo_splash.png')}
        style={mystyles.profileimage}
        />
        <CustomButton
          onPress={selectImage}
          title="Update photo"
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#255ECC',
          textAlign: 'left',
          width: Dimensions.get('window').width * 1,
          marginTop: -20,
        }}>
        <Text style={{fontSize: 18, marginLeft: 30, color: 'white'}}>
          Personal information
        </Text>
      </View>

      <View style={{width: '90%'}}>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <View style={{marginBottom: 20}}>
            <Text style={mystyles.dashlabel}>First name</Text>
            <TextInput style={mystyles.dashinput} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={mystyles.dashlabel}>Last name</Text>
            <TextInput style={mystyles.dashinput} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={mystyles.dashlabel}>Username</Text>
            <TextInput style={mystyles.dashinput} value={username} onChangeText={setUsername} placeholder="Username" />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={mystyles.dashlabel}>Email address</Text>
            <TextInput style={mystyles.dashinput} value={user.email} placeholder="Email" />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={mystyles.dashlabel}>Phone number</Text>
            <TextInput style={mystyles.dashinput} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
          </View>
        </View>
        <CustomButton
            onPress={() => sheetRef.current?.open()}
            title="Change my password"
            buttonStyle={{
              backgroundColor: 'transparent',
              width: Dimensions.get('window').width * 0.9,
              alignItems: 'center',
            }}
            textStyle={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          />
        <CustomButton
          onPress={updateProfile}
          title="Update Profile"
          buttonStyle={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 15,
            width: Dimensions.get('window').width * 0.9,
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>
    </ScrollView>
     {/* BOTTOM SHEET TO DISPLAY EMAIL ENTERING FOR RESETTING PASSWORD */}
     <BottomSheet ref={sheetRef} 
     height={400}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          scrollEnabled={true}
        > 
      <View style={{paddingHorizontal:20, alignItems:'center'}}>
      <View style={{marginBottom:20}}>
        <Text>Enter old password</Text>
        <TextInput
            style={mystyles.dashinput}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder='Old password'
            secureTextEntry
          />
      </View>

      <View style={{marginBottom:20}}>
        <Text>Enter New password</Text>
        <TextInput
            style={mystyles.dashinput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder='New password'
            secureTextEntry
          />
      </View>

      <View style={{marginBottom:20}}>
        <Text>Re-enter new password</Text>
        <TextInput
            style={mystyles.dashinput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder='Confirm new password'
            secureTextEntry
          />
      </View>
            
      <CustomButton
            onPress={handlePasswordChange}
            title="Update Password"
            buttonStyle={{backgroundColor: 'black', margin: 10, width: '70%'}}
            textStyle={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
          </View>
          </KeyboardAwareScrollView>
  </BottomSheet>
    </>
  );
}
export default ProfileScreen;
