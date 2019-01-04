/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../TWText/TWText';

type Props = {};
type State = {};

class TWTag extends Component<Props, State> {
  render() {
    return (
      <View style={{
        backgroundColor: 'red',
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomEndRadius: 15,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 20,
      }}
      >
        <TWText weight="regular" text="Pending" size="title" />
      </View>
    );
  }
}

export default TWTag;
