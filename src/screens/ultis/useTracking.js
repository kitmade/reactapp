import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
export default useTracking = (isActive) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!isActive) {
      if (_.isNull(location)) {
        BackgroundGeolocation.getCurrentLocation(({latitude, longitude}) => {
          setLocation({latitude, longitude});
        });
      }
      return;
    }

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      //debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER, // DISTANCE_FILTER_PROVIDER for
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar',
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar', // you can also add your own properties
      },
    });

    BackgroundGeolocation.checkStatus((status) => {
      if (status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    BackgroundGeolocation.on('location', ({latitude, longitude}) => {
      console.log(123);
      setLocation({latitude, longitude});
    });

    return () => {
      BackgroundGeolocation.removeAllListeners();
    };
  }, [location, isActive]);

  return {location};
};
