import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerAnimated,
} from 'react-native-maps';
import {getOtherDevicesLocation, setLocationToDB} from '../../utils';
import database from '@react-native-firebase/database';
import Ionicon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import useTracking from '../../utils/useTracking';

// const ic1 = require('../../assets/ic1.png');

const MainScreen = ({navigation, route}) => {
  const [isTracking, setIsTracking] = useState(false);
  const {location} = useTracking(isTracking);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!_.isNull(location)) {
      setLocationToDB(route.params.name, {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }

    getOtherDevicesLocation(setLocations);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>{route.params.name}asd</Text>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: location === null ? 0 : location?.latitude,
          longitude: location === null ? 0 : location?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {!_.isEmpty(locations) &&
          locations.map((item) => {
            if (item.name !== route.params.name) {
              return (
                <MarkerAnimated
                  key={item.name}
                  title={item.name}
                  description={`x: ${item.location.latitude}, y: ${item.location.longitude}`}
                  coordinate={item.location}>
                  <Ionicon name="body" size={50} />
                </MarkerAnimated>
              );
            }
          })}
      </MapView>
      <Button
        title={`Let's go`}
        onPress={() => {
          setIsTracking(!isTracking);
        }}
      />
    </View>
  );
};

export default MainScreen;
