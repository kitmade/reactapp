import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import database from '@react-native-firebase/database';
export default useTracking = ({isActive, deviceName}) => {
  const [location, setLocation] = useState({latitude: null, longitude: null});

  BackgroundGeolocation.getCurrentLocation((cur) => {
    if (
      cur.latitude !== location.latitude ||
      cur.longitude !== location.longitude
    ) {
      setLocation({latitude: cur.latitude, longitude: cur.longitude});
    }
  });

  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      notificationsEnabled: false,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 5000,
      fastestInterval: 2500,
      activitiesInterval: 5000,
      stopOnStillActivity: false,
      url: database().ref(`devices/${deviceName}`).toString(),
      // httpHeaders: {
      //   'X-FOO': 'bar',
      // },
      // customize post properties
      postTemplate: {
        latitude: '@latitude',
        longitude: '@longitude',
        foo: 'bar', // you can also add your own properties
      },
    });
  }, []);

  useEffect(() => {
    // if (!isActive) {
    //   BackgroundGeolocation.checkStatus((status) => {
    //     if (status.isRunning) {
    //       console.log(123)
    //       BackgroundGeolocation.stop();
    //     }
    //   });
    //   return;
    // }

    BackgroundGeolocation.checkStatus((status) => {
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    BackgroundGeolocation.getConfig((config) => {
      // console.log(123, config);
    });

    BackgroundGeolocation.on('authorization', (status) => {
      // console.log(123, status);
    });

    BackgroundGeolocation.on('location', (location) => {
      setLocation({latitude: location.latitude, longitude: location.longitude});
      BackgroundGeolocation.startTask((taskKey) => {
        // if (taskKey > 0) {
        //   getCurrentLocationOnForeground();
        // }
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('App is running in foreground');

      // BackgroundGeolocation.checkStatus((status) => {
      //   if (status.isRunning) {
      //     BackgroundGeolocation.stop();
      //   }
      // });
      // getCurrentLocationOnForeground();
    });

    BackgroundGeolocation.on('background', () => {
      console.log('App is running in background');
      // BackgroundGeolocation.start();
      // getCurrentLocationOnForeground();
      // BackgroundGeolocation.getCurrentLocation(({latitude, longitude}) => {
      //   setLocation({latitude, longitude});
      // });
    });

    // BackgroundGeolocation.checkStatus((status) => {
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start();
    //   }
    // });

    return () => {
      BackgroundGeolocation.removeAllListeners();
      // BackgroundGeolocation.checkStatus((status) => {
      //   if (status.isRunning) {
      //     BackgroundGeolocation.stop();
      //   }
      // });
    };
  }, [location.longitude, location.latitude, isActive]);
  return {location};
};
