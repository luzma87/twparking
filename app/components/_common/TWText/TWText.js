/* @flow */
import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import I18n from '../../../i18n';

export type fontSizes = 'big' | 'title' | 'regular' | 'small' | 'tiny';

type Props = {
  font?: 'almendra' | 'bree' | 'comingSoon' | 'cormorantUpright' | 'noticiaText' | 'reenieBeanie' | 'vt323',
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold',
  size?: fontSizes,
  color?: string,
  align?: 'left' | 'center' | 'right' | 'justify',
  i18n?: ?string,
  i18nParams?: Object,
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
    i18nParams: {},
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
      i18n,
      i18nParams,
      lineHeight,
      style,
      italic,
      uppercase,
      shadow,
      ...attributes
    } = this.props;

    let shownText = '';
    if (i18n) {
      shownText = I18n.t(i18n, i18nParams);
    } else if (text && text !== null && text !== undefined) {
      shownText = text;
    }
    if (uppercase) {
      shownText = shownText.toUpperCase();
    }

    let usableLineHeight = 1;
    const fontSize = getFontSize(size);
    let usableFont: string = 'almendra';
    if (font) {
      usableFont = font;
    }
    if (lineHeight) {
      usableLineHeight = lineHeight * fontSize;
    }
    let shadowStyle = {};
    if (shadow) {
      shadowStyle = {
        textShadowColor: colors.gray2,
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
        {shownText}
      </Text>
    );
  }
}
