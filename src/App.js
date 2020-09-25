import React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import storeConfig from './redux/storeConfig';

const store = storeConfig();

const App = ({params}) => {
  //   const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <View>
        <SafeAreaView>
          <Text>App</Text>
          <Button
            title="Init"
            //   onPress={() => {
            //     dispatch();
            //   }}
          />
        </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;
