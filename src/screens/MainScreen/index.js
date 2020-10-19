import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Text, View, SafeAreaView, Button, Image} from 'react-native';
import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
import _ from 'lodash';
import {getDataFromDB, setDataToDB, stopGetDataFromDB} from '../ultis';
import useTracking from '../ultis/useTracking';
import {useFocusEffect} from '@react-navigation/native';

const smartphone = require('../../assets/smartphone.png');

const MainScreen = ({route, navigation}) => {
  const [isActive, setActive] = useState(false);
  const [other, setOther] = useState([]);
  const {location} = useTracking({isActive, deviceName: route.params.name});
  const mapRef = useRef(null);

  useEffect(() => {
    getDataFromDB(setOther);

    return () => {
      stopGetDataFromDB();
      BackgroundGeolocation.stop();
    };
  }, []);

  useEffect(() => {
    setDataToDB(route.params.name, location);
  }, [location.longitude, location.latitude]);

  // const onBtnPress = () => {
  //   if (isActive) {
  //     setActive(false);
  //   } else {
  //     setActive(true);
  //   }
  // };

  const onFocusRegionPress = () => {
    BackgroundGeolocation.getCurrentLocation(({latitude, longitude}) => {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    });
  };

  // console.log(123, other, location)

  return (
    <SafeAreaView style={{flex: 1}}>
      {!_.isNull(location.latitude) && !_.isNull(location.longitude) && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          // region={{
          //   latitude: location === null ? 0 : location.latitude,
          //   longitude: location === null ? 0 : location.longitude,
          //   latitudeDelta: 0.005,
          //   longitudeDelta: 0.005,
          // }}
          // showsMyLocationButton
          showsUserLocation>
          {other.map((item, index) => {
            if (item.name !== route.params.name) {
              return (
                <MarkerAnimated
                  title={item.name}
                  key={`${item.name}-${index}`}
                  coordinate={item.location}
                  style={{height: 15, width: 15}}
                />
              );
            }
          })}
        </MapView>
      )}

      {/* <Button
        title={isActive ? 'Stop Tracking' : 'Start Tracking'}
        onPress={onBtnPress}
      /> */}
      <Button title="Focus" onPress={onFocusRegionPress} />
    </SafeAreaView>
  );
};

export default MainScreen;
