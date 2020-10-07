import React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Provider, useDispatch} from 'react-redux';
import storeConfig from './redux/storeConfig';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';

const store = storeConfig();

const Stack = createStackNavigator();

const App = ({params}) => {
  //   const dispatch = useDispatch();
  // BackgroundGeolocation.start();
  // BackgroundGeolocation.checkStatus((status) => {
  //   console.log(123, status);
  // });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Name">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
