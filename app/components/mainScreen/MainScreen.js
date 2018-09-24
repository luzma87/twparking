/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Button, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './MainScreenStyles';
import appNavigation from '../../navigation/Routes';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n'
    + 'Shake or press menu button for dev menu',
});

type Props = {
  navigation: Object
}

const MainScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Hola mundo</Text>
    <Text style={styles.instructions}>To get started, edit App.js</Text>
    <Text style={styles.instructions}>{instructions}</Text>
    <Button
      title="Click me"
      onPress={() => {
        navigation.navigate(appNavigation.navigationTree.Second);
      }}
    />
    <TouchableWithoutFeedback
      onPress={() => {
        console.warn('touchable clicked');
      }}
    >
      <Text>Cliiick</Text>
    </TouchableWithoutFeedback>
  </View>
);

export default MainScreen;
