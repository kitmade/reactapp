import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, TextInput, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState('');

  const onNameChange = (text) => {
    setName(text);
  };

  const onGoPress = () => {
    if (name.length > 0) {
      navigation.navigate('Main', {name});
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{textAlign: 'center'}}
        onChangeText={onNameChange}
        value={name}
        placeholder="Enter a name"
      />
      <Button title="Go" onPress={onGoPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;
