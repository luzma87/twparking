/* @flow */
import React, { Component } from 'react';
import { scale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import deviceHelper from '../../../util/deviceHelper';

const buttonMargin = 2;
const windowWidth = Dimensions.get('window').width;

const usableWidth = windowWidth - 25;
const buttonSize = (usableWidth - buttonMargin * 4) / 3;

const defaultWidth = buttonSize;
const defaultHeight = buttonSize;
const contrastBase = 200;
const iconColorBase = 400;
const iconDisabledBase = 100;

type Props = {
  i18n: string,
  onPress: () => void,
  i18nParams?: Object,
  icon?: ?string,
  iconSize?: number,
  uppercase?: boolean,
  disabled?: boolean,
  tint?: string,
  tintBase?: number,
  widthRatio?: number,
  heightRatio?: number,
};

class TWMetroButton extends Component<Props, {}> {
  static defaultProps = {
    i18nParams: {},
    icon: null,
    iconSize: 20,
    uppercase: false,
    disabled: false,
    tintBase: 500,
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
      tintBase,
      widthRatio,
      heightRatio,
      ...attributes
    } = this.props;

    const usableWidthRatio = widthRatio || 1;
    const usableHeightRatio = heightRatio || 1;
    const usableTint = tint || 'primary';
    const usableTintBase = tintBase || 500;

    let width = usableWidthRatio * defaultWidth;
    width += (usableWidthRatio - 1) * (buttonMargin + 2);
    let height = usableHeightRatio * defaultHeight;
    height += (usableHeightRatio - 1) * (buttonMargin + 2);

    const color1Number = `${usableTint}${usableTintBase}`;
    const color2Number = `${usableTint}${usableTintBase + contrastBase}`;
    const color3Number = `${usableTint}${usableTintBase + iconColorBase}`;
    const color4Number = `${usableTint}${usableTintBase + iconDisabledBase}`;
    const color1 = colors[color1Number];
    const color2 = colors[color2Number];
    const color3 = colors[color3Number];
    const color4 = colors[color4Number];

    const baseFontSize = deviceHelper.isTinyPhone() ? 18 : 24;

    const titleStyle = {
      fontFamily: fonts.vt323.regular,
      fontSize: scale(baseFontSize),
    };
    const buttonStyle = {
      backgroundColor: colors.secondary500,
      borderRadius: 0,
      paddingHorizontal: 10,
      margin: buttonMargin,
      borderWidth: 4,
    };

    let shownText = I18n.t(i18n, i18nParams);
    if (uppercase) {
      shownText = shownText.toUpperCase();
    }

    let disableStyles = {};
    if (disabled) {
      disableStyles = {
        borderColor: colors.blueGray800,
        backgroundColor: colors.blueGray400,
      };
    }

    return (
      <Button
        icon={(
          <FontAwesome5Pro
            solid
            size={iconSize}
            name={icon}
            color={color3}
            style={{ marginRight: 4 }}
          />
        )}
        titleStyle={{ ...titleStyle, ...{ color: disabled ? colors.blueGray900 : color3 } }}
        buttonStyle={{
          ...buttonStyle,
          ...{
            width,
            height,
            backgroundColor: color1,
            borderColor: color2,
          },
        }}
        disabled={disabled}
        disabledStyle={disableStyles}
        buttonColor={colors.primary700}
        title={shownText}
        onPress={onPress}
        {...attributes}
      />
    );
  }
}

export default TWMetroButton;
