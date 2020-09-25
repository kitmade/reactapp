import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import storeConfig from './redux/storeConfig';

const store = storeConfig();

const App = ({params}) => {
  return (
    <Provider store={store}>
      <View>
        <SafeAreaView>
          <Text>App</Text>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;
