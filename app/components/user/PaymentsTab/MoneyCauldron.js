/* @flow */
import React from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';

type Props = {
  size: number
};

const MoneyCauldron = (props: Props) => {
  const { size } = props;
  const bigCoinSize = size / 4.5;
  const smallCoinSize = size / 6.5;
  return (
    <View>
      <FontAwesome5Pro
        light
        size={size}
        name="cauldron"
        color={colors.green800}
      />
      <FontAwesome5Pro
        size={smallCoinSize}
        name="usd-circle"
        color={colors.green800}
        style={{ position: 'absolute', top: size / 8.6, left: size / 13 }}
      />
      <FontAwesome5Pro
        size={smallCoinSize}
        name="usd-circle"
        color={colors.green800}
        style={{ position: 'absolute', top: 0, left: size / 1.5 }}
      />
      <FontAwesome5Pro
        size={bigCoinSize}
        name="usd-circle"
        color={colors.green800}
        style={{ position: 'absolute', top: size / 2, left: size / 6.5 }}
      />
      <FontAwesome5Pro
        size={bigCoinSize}
        name="usd-circle"
        color={colors.green800}
        style={{ position: 'absolute', top: size / 2.6, left: size / 2.2 }}
      />
      <FontAwesome5Pro
        size={bigCoinSize}
        name="usd-circle"
        color={colors.green800}
        style={{ position: 'absolute', top: size / 1.5, left: size / 2.6 }}
      />
    </View>
  );
};
export default MoneyCauldron;
