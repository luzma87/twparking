/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../_common/TWText/TWText';

type Props = {};
type State = {};

class Payments extends Component<Props, State> {
  render() {
    return (
      <View>
        <TWText text="this is the payments screen" />
      </View>
    );
  }
}

export default Payments;
