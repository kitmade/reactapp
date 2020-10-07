import React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Provider, useDispatch} from 'react-redux';
import storeConfig from './redux/storeConfig';

const store = storeConfig();

const App = ({params}) => {
  //   const dispatch = useDispatch();
  return (
    <Provider store={store}>
      {/* <View> */}
      <SafeAreaView style={{flex: 1}}>
        <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} />
        <Text>App</Text>
        <Button
          title="Init"
          //   onPress={() => {
          //     dispatch();
          //   }}
        />
      </SafeAreaView>
      {/* </View> */}
    </Provider>
  );
};

export default App;
