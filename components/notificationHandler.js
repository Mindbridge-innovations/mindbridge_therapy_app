import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const registerNotificationHandlers = (navigation) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    navigateToCallPage(remoteMessage.data, navigation);
  });

  messaging().onMessage(async remoteMessage => {
    Alert.alert(
      'Incoming Video Call',
      'You have an incoming video call.',
      [
        { text: 'Reject', onPress: () => console.log('Call rejected') },
        { text: 'Accept', onPress: () => navigateToCallPage(remoteMessage.data, navigation) },
      ]
    );
  });
};

export const checkInitialNotification = async (navigation) => {
  const initialNotification = await messaging().getInitialNotification();
  if (initialNotification) {
    navigateToCallPage(initialNotification.data, navigation);
  }
};

const navigateToCallPage = (data, navigation) => {
  navigation.navigate('VideoCallPage', {
    passedUser: {
      id: data.callerId,
    },
    callId: data.callId,
  });
};