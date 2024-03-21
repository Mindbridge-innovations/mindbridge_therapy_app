// App.js
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import RNEncryptedStorage from 'react-native-encrypted-storage';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ScrollView} from 'react-native-gesture-handler';

export default function VoiceCallPage(props) {
  randomUserID = String(Math.floor(Math.random() * 100000));

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={videoCallStyles.container}>
        <ZegoUIKitPrebuiltCall
          appID={1043118981}
          appSign={
            '2dbebdfca550d7111732d5ea03bf11d9702ebb40f2ca6dfe38d2a7c888a414dc'
          }
          userID={randomUserID} // userID can be something like a phone number or the user id on your own user system.
          userName={'user_' + randomUserID}
          callID={String(100090)} // callID can be any unique string.
          config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VOICE_CALL_CONFIG,
            
            onOnlySelfInRoom: () => {
              props.navigation.navigate('DashboardDrawer');
            },
            onHangUp: () => {
              props.navigation.navigate('DashboardDrawer');
            },
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
