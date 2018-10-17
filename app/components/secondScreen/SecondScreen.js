/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';
import TWHeader from '../TWHeader/TWHeader';

const SecondScreen = () => (
  <View>
    <TWHeader
      title="klsanlkasnlks"
      onPress={() => {
        console.warn('LOL');
      }}
    />
    <Text>Second screen</Text>
  </View>
);

export default SecondScreen;
