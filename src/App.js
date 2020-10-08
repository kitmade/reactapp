import React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import storeConfig from './redux/storeConfig';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import HomeScreen from './screens/HomeScreen';
// import MainScreen from './screens/MainScreen';

const store = storeConfig();

const Stack = createStackNavigator();

const App = ({params}) => {
  BackgroundGeolocation.checkStatus((status) => {
    console.log(123, status);
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home"></Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
