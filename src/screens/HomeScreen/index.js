import {set} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Button, TouchableHighlight} from 'react-native';
import _ from 'lodash';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (!_.isEmpty(name)) {
      console.log(123);
      setName('');
    }
  }, []);
  const onNameChange = (text) => {
    setName(text);
  };

  const onGoPress = () => {
    if (!_.isEmpty(name)) {
      navigation.navigate('Main', {name});
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput placeholder="Enter a name" onChangeText={onNameChange} />
      <TouchableHighlight
        style={{
          paddingHorizontal: 24,
          paddingVertical: 8,
          backgroundColor: 'cyan',
        }}
        onPress={onGoPress}>
        <Text>Go</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HomeScreen;
