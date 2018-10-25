/* @flow */
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

type Props = {
  i18n: string,
  onPress: () => void,

  i18nParams?: Object,
  icon?: string,
  iconSize?: number,
  iconColor?: string,
  buttonColor?: string,
  titleColor?: string,
  uppercase?: boolean
};

class TWButton extends Component<Props, {}> {
  static defaultProps: Props = {
    i18nParams: {},
    icon: null,
    iconSize: 16,
    buttonColor: colors.secondary500,
    iconColor: colors.white,
    titleColor: colors.white,
    uppercase: false,
  };

  render() {
    const {
      i18n,
      i18nParams,
      onPress,
      icon,
      iconSize,
      buttonColor,
      iconColor,
      titleColor,
      uppercase,
      ...attributes
    } = this.props;
    const buttonStyle = {
      backgroundColor: buttonColor,
      borderRadius: 5,
    };
    const titleStyle = {
      color: titleColor,
      fontFamily: fonts.vt323.regular,
      fontSize: 24,
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
            color={iconColor}
          />
          )}
        title={shownText}
        titleStyle={titleStyle}
        onPress={onPress}
        buttonStyle={buttonStyle}
        {...attributes}
      />
    );
  }
}

export default TWButton;
