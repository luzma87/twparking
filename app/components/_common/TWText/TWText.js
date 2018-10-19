/* @flow */
import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

export type fontSizes = 'big' | 'title' | 'regular' | 'small' | 'tiny';

type Props = {
  font?: 'almendra' | 'comingSoon' | 'cormorantUpright' | 'reenieBeanie' | 'vt323',
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold',
  size?: fontSizes,
  color?: string,
  align?: 'left' | 'center' | 'right' | 'justify',
  text?: string,
  lineHeight?: number,
  uppercase?: boolean,
  italic?: boolean,
  shadow?: boolean,
  style?: any,
};

const baseFontSize = Platform.OS === 'ios' ? 20 : 19;

const transformToScale = (factor) => {
  const total = Math.round(baseFontSize * factor);
  return scale(total);
};

const getFontSize = (size) => {
  switch (size) {
    case 'big':
      return transformToScale(2.5);
    case 'title':
      return transformToScale(1.5);
    case 'regular':
      return transformToScale(1);
    case 'small':
      return transformToScale(0.8);
    case 'tiny':
      return transformToScale(0.6);
    default:
      return transformToScale(1);
  }
};

const getFontFamily = (font, weight, italic) => {
  if (italic) {
    return fonts[font].italic[weight];
  }
  return fonts[font][weight];
};

// eslint-disable-next-line react/prefer-stateless-function
export default class TWText extends Component<Props, {}> {
  static defaultProps = {
    font: 'almendra',
    weight: 'regular',
    size: 'regular',
    color: colors.primary800,
    align: 'left',
    lineHeight: 1,
    text: undefined,
    i18n: null,
    style: null,
    italic: false,
    shadow: false,
    uppercase: false,
  };

  render() {
    const {
      font,
      weight,
      size,
      color,
      align,
      text,
      lineHeight,
      style,
      italic,
      uppercase,
      shadow,
      ...attributes
    } = this.props;

    let usableLineHeight = 1;
    const fontSize = getFontSize(size);
    let usableFont: string = 'almendra';
    if (font) {
      usableFont = font;
    }
    if (lineHeight) {
      usableLineHeight = lineHeight * fontSize;
    }
    let textToShow = text;
    if (uppercase) {
      textToShow = text.toUpperCase();
    }
    let shadowStyle = {};
    if (shadow) {
      shadowStyle = {
        textShadowColor: colors.grayAlpha,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
      };
    }

    return (
      <Text
        style={[
          {
            fontFamily: getFontFamily(usableFont, weight, italic),
            fontSize,
            lineHeight: usableLineHeight,
            color,
            textAlign: align,
          }, style, shadowStyle]}
        {...attributes}
      >
        {textToShow}
      </Text>
    );
  }
}
