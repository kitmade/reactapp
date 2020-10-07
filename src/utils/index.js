import database from '@react-native-firebase/database';
import {useEffect} from 'react';

export const setLocationToDB = (name, value) => {
  database().ref(`devices/${name}`).set(value);
};

export const getOtherDevicesLocation = (callback) => {
  const list = [];
  database()
    .ref('devices')
    .on('value', (value) => {
      value.forEach((item) => {
        list.push({name: item.key, location: item.val()});
      });
      callback(list);
    });
};
