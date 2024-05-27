// App.js
import React, {Component, useContext, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import UserContext from '../utils/contexts/userContext';

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
  const callID= [user.userId, passedUser.userId].sort().join('_');
  const userName = user.lastName || user.username;

 

  return (
console.log('CALL IDENTIFICATION FOR THE VIDEO CALL IS:',callID),

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={videoCallStyles.container}>
        <ZegoUIKitPrebuiltCall
          appID={Config.ZEGOCLOUD_APP_ID2}
          appSign={Config.ZEGOCLOUD_APP_SIGN2}
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
