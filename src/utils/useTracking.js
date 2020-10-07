import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import _ from 'lodash';

const useTracking = (isActive) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (isActive) {
      BackgroundGeolocation.checkStatus((status) => {
        if (!status.isRunning) {
          BackgroundGeolocation.start();
        }
      });

      BackgroundGeolocation.getCurrentLocation(({latitude, longitude}) => {
        setLocation({latitude, longitude});
      });

      BackgroundGeolocation.on('foreground', () => {
        console.log('App is foreground');
      });

      BackgroundGeolocation.on('background', () => {
        console.log('App is background');
      });
    } else {
      if (_.isNull(location)) {
        BackgroundGeolocation.getCurrentLocation(({latitude, longitude}) => {
          setLocation({latitude, longitude});
        });
      }
    }

    //   console.log(123)
    // BackgroundGeolocation.on('location', (location) => {
    //   setLocation({
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //   });
    // });

    // return () => {
    //   BackgroundGeolocation.removeAllListeners;
    // };
  }, [isActive, location]);

  return {location};
};

export default useTracking;
