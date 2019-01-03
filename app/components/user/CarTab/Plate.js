/* @flow */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
// noinspection ES6CheckImport
import { isEmpty } from 'lodash';
import TWText from '../../_common/TWText/TWText';
import colors from '../../../styles/colors';

type Props = {
  plate: string,

};
type State = {};

const antLogo = require('./images/ant.png');

export default class Plate extends Component<Props, State> {
  static getRivet(side: 'left' | 'right') {
    const rivetSize = 10;
    const horizontalPosition = side === 'left' ? { left: 10 } : { right: 10 };
    return (
      <View
        style={[
          {
            width: rivetSize,
            height: rivetSize,
            backgroundColor: colors.gray3,
            position: 'absolute',
            borderRadius: rivetSize,
            borderWidth: 2,
            borderColor: colors.gray1,
            top: 3,
          }, horizontalPosition,
        ]}
      />
    );
  }

  render() {
    const antSize = 15;
    const { plate } = this.props;
    const shownPlate = isEmpty(plate) ? ' ' : plate;
    return (
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          marginTop: 15,
          marginBottom: 30,
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
          <Image
            source={antLogo}
            style={{
              width: antSize,
              height: antSize,
              position: 'absolute',
              top: 3,
              left: 25,
            }}
          />
          {Plate.getRivet('left')}
          {Plate.getRivet('right')}

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
            text={shownPlate}
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
