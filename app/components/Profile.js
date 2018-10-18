/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from './_common/TWText/TWText';

type Props = {};
type State = {};

class Profile extends Component<Props, State> {
  render() {
    return (
      <View>
        <TWText text="this is the profile screen" />
      </View>
    );
  }
}

export default Profile;
