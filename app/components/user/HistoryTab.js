/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../_common/TWText/TWText';

type Props = {};
type State = {};

class HistoryTab extends Component<Props, State> {
  render() {
    return (
      <View>
        <TWText text="this is the history screen" />
      </View>
    );
  }
}

export default HistoryTab;
