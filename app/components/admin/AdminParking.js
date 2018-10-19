/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../_common/TWText/TWText';

type Props = {};
type State = {};

class AdminParking extends Component<Props, State> {
  render() {
    return (
      <View>
        <TWText text="this is the AdminParking screen" />
      </View>
    );
  }
}

export default AdminParking;
