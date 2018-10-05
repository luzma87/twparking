/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import firebase from 'react-native-firebase';
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

const getQuery = ()=>{
  console.warn('firebase ready to access');
  firebase.database().ref('cars/').once('value', function (snapshot) {
    console.warn(snapshot.val())
  });
};

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
        getQuery();
      }}
    >
      <Text>Cliiick</Text>
    </TouchableWithoutFeedback>
  </View>
);

export default MainScreen;
