/* @flow */
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const defaultWidth = 115;
const defaultHeight = 115;
const colorBase = 500;
const contrastBase = 200;
const iconColorBase = 400;

type Props = {
  i18n: string,
  onPress: () => void,
  i18nParams?: Object,
  icon?: ?string,
  iconSize?: number,
  uppercase?: boolean,
  disabled?: boolean,

  tint?: string,
  widthRatio?: number,
  heightRatio?: number,
};

class TWMetroButton extends Component<Props, {}> {
  static defaultProps = {
    i18nParams: {},
    icon: null,
    iconSize: 16,
    uppercase: false,
    disabled: false,
    tint: 'primary',
    widthRatio: 1,
    heightRatio: 1,
  };

  render() {
    const {
      i18n,
      i18nParams,
      onPress,
      icon,
      iconSize,
      disabled,
      uppercase,
      tint,
      widthRatio,
      heightRatio,
      ...attributes
    } = this.props;

    const usableWidthRatio = widthRatio || 1;
    const usableHeightRatio = heightRatio || 1;
    const usableTint = tint || 'primary';

    const width = usableWidthRatio * defaultWidth;
    const height = usableHeightRatio * defaultHeight;

    const color1Number = `${usableTint}${colorBase}`;
    const color2Number = `${usableTint}${colorBase + contrastBase}`;
    const color3Number = `${usableTint}${colorBase + iconColorBase}`;
    const color1 = colors[color1Number];
    const color2 = colors[color2Number];
    const color3 = colors[color3Number];

    const titleStyle = {
      fontFamily: fonts.vt323.regular,
      fontSize: 24,
    };
    const buttonStyle = {
      backgroundColor: colors.secondary500,
      borderRadius: 0,
      paddingHorizontal: 10,
      margin: 2,
      borderWidth: 4,
    };

    let shownText = I18n.t(i18n, i18nParams);
    if (uppercase) {
      shownText = shownText.toUpperCase();
    }

    return (
      <Button
        icon={(
          <FontAwesome5Pro
            solid
            size={iconSize}
            name={icon}
            color={color3}
          />
        )}
        titleStyle={{ ...titleStyle, ...{ color: color3 } }}
        buttonStyle={{
          ...buttonStyle,
          ...{
            width,
            height,
            backgroundColor: color1,
            borderColor: color2,
          },
        }}
        buttonColor={colors.primary700}
        title={shownText}
        onPress={onPress}
        {...attributes}
      />
    );
  }
}

export default TWMetroButton;
