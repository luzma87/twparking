/* @flow */
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import i18n from '../../../i18n';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

type Props = {
  titleI18n: string,
  onPress: () => void,

  icon?: string,
  iconSize?: number,
  iconColor?: string,
  buttonColor?: string,
  titleColor?: string,
  uppercase?: boolean
};

// eslint-disable-next-line react/prefer-stateless-function
class TWButton extends Component<Props, {}> {
  static defaultProps: Props = {
    icon: null,
    iconSize: 16,
    buttonColor: colors.secondary500,
    iconColor: colors.white,
    titleColor: colors.white,
    uppercase: false,
  };

  render() {
    const {
      titleI18n,
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

    let shownText = i18n.t(titleI18n);
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
        style={{ marginTop: 20 }}
        buttonStyle={buttonStyle}
        {...attributes}
      />
    );
  }
}

export default TWButton;
