import React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import storeConfig from './redux/storeConfig';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import MainScreen from './screens/MainScreen';

const store = storeConfig();

const Stack = createStackNavigator();

const App = ({params}) => {
  return (
    // <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={() => (
            <View style={{flex: 1}}>
              <Text>Hello</Text>
            </View>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
