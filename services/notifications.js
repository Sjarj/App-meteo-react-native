import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

export const subscribeToPushNotifications = () => {
  Permissions.getAsync(Permissions.NOTIFICATIONS).then(existingPermissions => {
    if (existingPermissions !== 'ganted') {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(Permissions => {
        if (Permissions.status != 'ganted') {
          return;
        } else {
          Notifications.getExpoPushTokenAsync().then(token => {
            axios
              .get(
                'https://notification-test-sjarj.herokuapp.com/?token=' + token
              )
              .then(axiosResponse => {
                console.log('La réponse', axiosResponse.data);
              });
          });
        }
      });
    } else {
      Notifications.getExpoPushTokenAsync().then(token => {
        axios
          .get('https://notification-test-sjarj.herokuapp.com/?token=' + token)
          .then(axiosResponse => {
            console.log('La réponse', axiosResponse.data);
          });
      });
    }
  });
};
