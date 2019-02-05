/* @flow */
import React from 'react';
import { Badge } from 'react-native-elements';
import colors from '../../styles/colors';

type Props = {
  color: string,
  style?: {}
};

const ColorTag = (props: Props) => {
  const { color, style } = props;
  const backgroundColor = colors.carColor[color];
  return (
    <Badge status="primary" containerStyle={[style]} badgeStyle={{ backgroundColor, borderColor: colors.black }} />
  );
};

ColorTag.defaultProps = {
  style: {},
};

export default ColorTag;
