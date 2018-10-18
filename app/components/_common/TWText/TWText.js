/* @flow */
import React, {Component} from 'react';
import {Platform, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from "../../../styles/colors";

export type fontSizes = 'huge' | 'big' | 'title' | 'regular' | 'small' | 'tiny';

type Props = {
  weight?: 'light' | 'regular' | 'bold' | 'black',
  size?: fontSizes,
  color?: string,
  align?: 'left' | 'center' | 'right' | 'justify',
  text?: string,
  lineHeight?: number,
  style?: any,
  uppercase?: boolean
};

const baseFontSize = Platform.OS === 'ios' ? 20 : 19;

const transformToScale = (factor) => {
  const total = Math.round(baseFontSize * factor);
  return scale(total);
};

const sizeToScale = (size) => {
  const adjustedSize = size * 2;
  const factor = adjustedSize / baseFontSize;
  return transformToScale(factor);
};

const getFontSize = (size) => {
  switch (size) {
    case 'huge':
      return transformToScale(5);
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

export default class TWText extends Component<Props, {}> {
  static defaultProps = {
    weight: 'regular',
    size: 'regular',
    color: colors.black,
    align: 'left',
    lineHeight: 1,
    text: undefined,
    i18n: null,
    style: null,
    uppercase: false,
  };

  render() {
    const {
      weight,
      size,
      color,
      align,
      text,
      lineHeight,
      uppercase,
      style,
      ...attributes
    } = this.props;

    let usableLineHeight = 1;
    let fontSize = getFontSize(size);
    if (lineHeight) {
      usableLineHeight = lineHeight * fontSize;
    }
    let textToShow = text;
    if (uppercase) {
      textToShow = text.toUpperCase();
    }

    return (
      <Text
        style={[
          {
            fontWeight: weight,
            fontSize,
            lineHeight: usableLineHeight,
            color,
            textAlign: align,
          }, style]}
        {...attributes}
      >
        {textToShow}
      </Text>
    );
  }
}
