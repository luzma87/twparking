/* @flow */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import TWText from '../../_common/TWText/TWText';
import colors from '../../../styles/colors';

type Props = {
  plate: ?string,

};
type State = {};

const antLogo = require('./images/ant.png');

export default class Plate extends Component<Props, State> {
  getRivet(side: 'left' | 'right') {
    const rivetSize = 10;
    const horizontalPosition = side === 'left' ? { left: 10 } : { right: 10 };
    return (
      <View
        style={[{
          width: rivetSize,
          height: rivetSize,
          backgroundColor: colors.gray3,
          position: 'absolute',
          borderRadius: rivetSize,
          borderWidth: 2,
          borderColor: colors.gray1,
          top: 3,
        }, horizontalPosition]}
      />
    );
  }

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
          <View style={{ position: 'absolute' }}>
            <Image source={antLogo} />
          </View>
          {this.getRivet('left')}
          {this.getRivet('right')}

          <TWText
            text="Ecuador"
            weight="bold"
            size="small"
            style={{ marginVertical: 7 }}
            font="bree"
            color={colors.black}
            shadow
            uppercase
          />
          <TWText
            text="PPO-1234"
            weight="bold"
            font="noticiaText"
            shadow
            uppercase
            color={colors.black}
            size="big"
          />
        </View>

      </View>
    );
  }
}
