/* @flow */
import React from 'react';
import { View } from 'react-native';
import TWText from '../TWText/TWText';
import BankIcon from './BankIcon';

type Props = {
  bank: string,
  textProps?: Object
};

const BankTag = (props: Props) => {
  const { bank, textProps } = props;
  return (
    <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
      <BankIcon bank={bank} style={{ marginRight: 8 }} />
      <TWText text={bank} font="vt323" {...textProps} />
    </View>
  );
};

BankTag.defaultProps = {
  textProps: {},
};

export default BankTag;
