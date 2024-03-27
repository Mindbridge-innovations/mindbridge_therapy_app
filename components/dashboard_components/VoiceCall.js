// App.js
import React, {Component, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import RNEncryptedStorage from 'react-native-encrypted-storage';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ScrollView} from 'react-native-gesture-handler';
import UserContext from '../../utils/contexts/userContext';
import Config from '../../config';

export default function VoiceCallPage({route,...props}) {
  const {passedUser}=route.params
  const {user}=useContext(UserContext)
  // randomUserID = String(Math.floor(Math.random() * 100000));
  const callId= [user.userId, passedUser.id].sort().join('_');
  const userName = user.lastName || user.username;

  const initiateVideoCall = async (callerId, calleeId) => {
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/initiateCall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callerId: user.phoneNumber,
          calleeId: passedUser.id,
          callId:callId,
        }),
      });
  
      if (response.ok) {
        console.log('Call initiated successfully');
      } else {
        console.error('Failed to initiate call');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  

  return (
    
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={videoCallStyles.container}>
        
        <ZegoUIKitPrebuiltCall
          appID={Config.ZEGOCLOUD_APP_ID}
          appSign={Config.ZEGOCLOUD_APP_SIGN}
          userID={user.phoneNumber} // userID can be something like a phone number or the user id on your own user system.
          userName={userName}
          callID={callId} // callID can be any unique string.
          config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VOICE_CALL_CONFIG,
            
            onOnlySelfInRoom: () => {
              props.navigation.navigate('DashboardDrawer');
            },
            onHangUp: () => {
              props.navigation.navigate('DashboardDrawer');
            },
            onHangUpConfirmation: () => {
              return new Promise((resolve, reject) => {
                  Alert.alert(
                      "You have opted to leave/exit this call.",
                      "Are you sure, you want to exit",
                      [
                          {
                              text: "Cancel",
                              onPress: () => reject(),
                              style: "cancel"
                          },
                          {
                              text: "Yes, Exit call",
                              onPress: () => resolve()
                          }
                      ]
                  );
              })
          }
          }}
        />
      </View>
    </ScrollView>
  );
}

const videoCallStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
