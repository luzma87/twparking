/* @flow */
import React from 'react';
import { View } from 'react-native';
import deviceHelper from '../../../util/deviceHelper';
import colors from '../../../styles/colors';

const IPhoneXTopSeparator = () => (
  deviceHelper.isiPhoneX() ? (
    <View
      style={{
        backgroundColor: colors.primary900,
        top: 0,
        right: 0,
        left: 0,
        height: 20,
        zIndex: -1000,
      }}
    />
  ) : null
);

export default IPhoneXTopSeparator;
