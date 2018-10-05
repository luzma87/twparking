/* @flow */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

type Props = {};
type State = {};

class LoginScreen extends Component<Props, State> {
  render() {
    return (
      <View>
        <Text>Log me in?</Text>
      </View>
    );
  }
}

export default LoginScreen;
