import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';

const MainScreen = (props) => {
  return (
    <SafeAreaView>
      <View>
        <StatusBar />
        <Text>MainScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
