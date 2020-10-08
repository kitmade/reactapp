import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';
import {getDataFromDB, setDataToDB} from '../ultis';
import useTracking from '../ultis/useTracking';

const MainScreen = ({route}) => {
  const [isActive, setActive] = useState(false);
  const [other, setOther] = useState([]);
  const {location} = useTracking(isActive);
  useEffect(() => {
    setDataToDB(route.params.name, location);
    getDataFromDB(setOther);
  }, [location]);

  const onBtnPress = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: location === null ? 0 : location.latitude,
          longitude: location === null ? 0 : location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation>
        {other.map((item, index) => {
          if (item.name === route.params.name) {
            <MarkerAnimated
              key={`${item.name}-${index}`}
              coordinate={item.location}
            />;
          }
        })}
      </MapView>
      <Button
        title={isActive ? 'Stop Tracking' : 'Start Tracking'}
        onPress={onBtnPress}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
