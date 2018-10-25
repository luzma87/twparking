/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../../_common/TWText/TWText';

type Props = {
  plate: ?string,

};
type State = {};

export default class Plate extends Component<Props, State> {
  render() {
    return (
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          marginTop: 15,
          marginBottom: 100,
          marginLeft: 10,
          padding: 5,
          borderRadius: 15,
        }}
      >

        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 5,
            borderRadius: 15,
          }}
        >
          <TWText
            text="Ecuador"
            weight="bold"
            size="small"
            style={{ marginVertical: 7 }}
            uppercase
          />
          <TWText
            text="PPO-1234"
            weight="bold"
            size="big"
          />
        </View>

      </View>
    );
  }
}
