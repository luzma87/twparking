/* @flow */
import React from 'react';
import { View } from 'react-native';
import colors from '../../../styles/colors';
import deviceHelper from '../../../util/deviceHelper';

const BottomSeparator = () => (
  <View
    style={{
      backgroundColor: colors.primary900,
      bottom: 0,
      right: 0,
      left: 0,
      height: deviceHelper.isiPhoneX() ? 25 : 10,
      zIndex: -1000,
    }}
  />
);

export default BottomSeparator;
