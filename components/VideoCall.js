// App.js
import React, {Component, useContext, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import UserContext from '../utils/contexts/userContext';
import { OneSignal } from 'react-native-onesignal';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ScrollView} from 'react-native-gesture-handler';
import Config from '../config';


export default function VideoCallPage({route,...props}) {
  // randomUserID = String(Math.floor(Math.random() * 100000));
  const {user}=useContext(UserContext)
  const {passedUser}=route.params
  const callID= [user.userId, passedUser.userId].join('_');
  const userName = user.lastName || user.username;

  useEffect(() => {
    // Initialize OneSignal with your OneSignal App ID
    OneSignal.initialize(Config.ONESIGNAL_APP_ID);

    // Request notification permission
    OneSignal.Notifications.requestPermission(true);

    //Set up OneSignal event handler for receiving notifications
    OneSignal.Notifications.addEventListener('click',(openedEvent) => {
      // Extract additional data from notification
      const additionalData = openedEvent.notification.payload.additionalData;

      // Check if notification contains data for video call navigation
      if (additionalData && additionalData.navigateToVideoCall) {
        // Navigate to the video call screen
        navigation.navigate('VideoCallPage', { passedUser: additionalData.passedUser });
      }
    });

    // Remove OneSignal event listener when component unmounts
    return () => {
      OneSignal.clearHandlers();
    };
  }, []);

  // Function to send OneSignal notification
  const sendOneSignalNotification = () => {
    // Construct notification content
    const notificationContent = {
      contents: { en: 'You have a video call invitation.' },
      include_player_ids: [passedUser.userId], // Add passedUser's OneSignal Player ID
      data: {
        navigateToVideoCall: true, // Flag to navigate to video call screen
        passedUser: passedUser, // Pass additional data about the user
      },
    };

    // Send the notification using OneSignal
    OneSignal.postNotification(notificationContent);
  };

  // Send OneSignal notification when component mounts
  useEffect(() => {
    sendOneSignalNotification();
  }, []);

  return (
console.log('CALL IDENTIFICATION FOR THE VIDEO CALL IS:',callID),

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={videoCallStyles.container}>
        <ZegoUIKitPrebuiltCall
          appID={Config.ZEGOCLOUD_APP_ID1}
          appSign={Config.ZEGOCLOUD_APP_SIGN1}
          userID={user.phoneNumber} // userID can be something like a phone number or the user id on your own user system.
          userName={userName}
          callID={callID} // callID can be any unique string.
          config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onOnlySelfInRoom: () => {
              props.navigation.navigate('DashboardDrawer');
            },
            onHangUp: () => {
              props.navigation.navigate('DashboardDrawer');
            },
            onHangUpConfirmation: () => {
              return new Promise((resolve, reject) => {
                  Alert.alert(
                    "Are you sure, you want to exit this call?",
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
