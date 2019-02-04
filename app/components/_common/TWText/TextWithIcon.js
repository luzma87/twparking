/* @flow */
import React from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { fontSizes } from './TWText';
import TWText from './TWText';

type Props = {
  icon: String,
  color: String,
  text?: String,
  textSize?: fontSizes,
  i18n?: String,
  i18nParams?: Object,
  style?: Object,
  textParams?: Object,
};

const iconSize = (textSize: fontSizes) => {
  switch (textSize) {
    case 'big':
      return 32;
    case 'title':
      return 24;
    case 'regular':
      return 16;
    case 'small':
      return 14;
    case 'tiny':
      return 12;
    default:
      return 24;
  }
};

const TextWithIcon = (props: Props) => {
  const {
    icon, text, i18n, i18nParams, color, textSize, style, textParams,
  } = props;
  const otherTextParams = {
    ...textParams,
    color,
    size: textSize,
  };
  if (text) {
    otherTextParams.text = text;
  }
  if (i18n) {
    otherTextParams.i18n = i18n;
    otherTextParams.i18nParams = i18nParams;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <FontAwesome5Pro
        solid
        size={iconSize(textSize)}
        name={icon}
        color={color}
        style={{ marginRight: 8 }}
      />
      <TWText {...otherTextParams} font="vt323" />
    </View>
  );
};

TextWithIcon.defaultProps = {
  text: undefined,
  i18n: undefined,
  i18nParams: {},
  textSize: 'title',
  style: {},
  textParams: {},
};

export default TextWithIcon;
