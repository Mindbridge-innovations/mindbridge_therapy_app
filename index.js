/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async (event) => {
  const { type, detail } = event;

  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed', detail.notification);
      break;
    case EventType.PRESS:
      console.log('Notification pressed', detail.notification);
      // You can navigate or handle other logic here
      break;
  }
  
});

notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('Notification dismissed', detail.notification);
        break;
      case EventType.PRESS:
        console.log('Notification pressed', detail.notification);
        break;
    }
  });




AppRegistry.registerComponent(appName, () => App);
