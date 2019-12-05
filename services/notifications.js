import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const subscribeToPushNotifications = () => {
  Permissions.getAsync(Permissions.NOTIFICATIONS).then(existingPermissions => {
    if (existingPermissions !== 'ganted') {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(Permissions => {
        if (Permissions.status != 'ganted') {
          return;
        } else {
          Notifications.getExpoPushTokenAsync().then(token => {
            console.log('le token', token);
          });
        }
      });
    } else {
      Notifications.getExpoPushTokenAsync().then(token => {
        console.log('le token', token);
      });
    }
  });
};
