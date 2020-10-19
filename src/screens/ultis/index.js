import database from '@react-native-firebase/database';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

export const getDataFromDB = (callback) => {
  database()
    .ref('devices')
    .on('value', (value) => {
      const list = [];
      value.forEach((item) => {
        list.push({name: item.key, location: item.val()});
      });
      callback(list);
    });
};

export const setDataToDB = (name, location) => {
  database().ref(`devices/${name}`).set(location);
};

export const stopGetDataFromDB = () => {
  database().ref('devices').off('value', getDataFromDB);
};
