// CustomDrawerContent.js
import React, { useContext, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import UserContext from '../../utils/contexts/userContext';

const CustomDrawerContent = props => {
 
    const { user, logout } = useContext(UserContext);
    const {isAuthenticated}=useContext(UserContext)
    const navigation=useNavigation()
    useEffect(() => {
      if (!isAuthenticated) {
          navigation.navigate('SignInScreen');
      }
  }, [isAuthenticated, navigation]);
  
  return (
      <DrawerContentScrollView {...props}>
      {/* Custom content at the top of the drawer */}
      <Image
        source={require('../../assets/mindbridgelogo_splash.png')}
        style={{height: 150, resizeMode: 'cover', width: Dimensions.get('window').width*0.8}}
      />

      {user.email &&(
      <Text style={{marginLeft:20, fontWeight:'400'}}>Logged as {user.email} </Text>
      )}
      

      {/* Default drawer items */}
      <DrawerItem
        label="My appointments"
        onPress={() => props.navigation.navigate('My appointments')}
        icon={() => <FontAwesomeIcon name="calendar" size={20} color="#000" />} // Replace with your desired icon
      />

{/* display the below drawer item only if user is a therapist */}
      {user.role==="therapist" && (<DrawerItem
        label="My patients"
        onPress={() => props.navigation.navigate('My patients')}
        icon={() => (
          <FontAwesome6 name="hospital-user" size={20} color="#000" />
        )} // Replace with your desired icon
      />
      )}

{/* display the below drawer item only if user is a client */}
      { user.role==="client" && (
      <DrawerItem
        label="Feedback/review"
        onPress={() => props.navigation.navigate('Feedback/review')}
        icon={() => <MaterialIcons name="reviews" size={20} color="#000" />} // Replace with your desired icon
      />
      )}

{/* display the below drawer item only if user is a patient*/}
      { user.role==="therapist" && (
            <DrawerItem
              label="My ratings/review"
              onPress={() => props.navigation.navigate('Ratings/review')}
              icon={() => <MaterialIcons name="star-rate" size={20} color="#000" />} // Replace with your desired icon
            />
            )}

{/* display the below drawer item only if user is a client */}
      { user.role==='client' && (
      <DrawerItem
        label="My therapists"
        onPress={() => props.navigation.navigate('My therapists')}
        icon={() => <FontAwesome6 name="user-doctor" size={20} color="#000" />} // Replace with your desired icon
      />
      )}

{/* display the below drawer item only if user is a client */}
    { user.role==='client' && (
          <DrawerItem
            label="Find a therapist"
            onPress={() => props.navigation.navigate('OnBoardQtnsScreen',{userData:user,  source:"UpdateResponse"})}
            icon={() => <MaterialIcons name="request-page" size={20} color="#000" />} // Replace with your desired icon
          />
          )}

    {/* { user.role==='therapist' && (
          <DrawerItem
            label="Generate VR token"
            onPress={() => props.navigation.navigate('TokenDisplay')}
            icon={() => <MaterialIcons name="request-page" size={20} color="#000" />} // Replace with your desired icon
          />
          )} */}
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
        icon={() => <AntDesignIcon name="profile" size={20} color="#000" />} // Replace with your desired icon
      />
      <DrawerItem
        label="Resource Library"
        onPress={() => props.navigation.navigate('Resource Library')}
        icon={() => <IoniconsIcon name="library" size={20} color="#000" />} // Replace with your desired icon
      />
      {/* Signout button at the bottom */}
      <DrawerItem
        label="Sign Out"
        onPress={()=>logout()}
        icon={() => <FontAwesomeIcon name="sign-out" size={20} color="#000" />} // Replace with your desired icon
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;