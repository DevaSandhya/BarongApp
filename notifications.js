// notifications.js
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid, Platform } from 'react-native';

export const configureNotifications = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    console.log('Notification permission granted:', granted);
  }

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  // Create Android channel
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
};

export const sendLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'default-channel-id', // Must match channelId created above
    title,
    message,
    playSound: true,
    soundName: 'default',
    importance: 'high',
    vibrate: true,
  });
};
