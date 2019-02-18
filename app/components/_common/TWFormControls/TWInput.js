/* @flow */
import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';

type Props = {
  onChangeText: (string) => void,
  i18nPlaceholder?: string | null,
  i18nPlaceholderParams?: Object,
  icon?: ?string,
  iconSize?: number,
  iconColor?: string,
  value?: string,
  uppercase?: boolean,
  type?: 'text' | 'number' | 'email',
};

class TWInput extends Component<Props, {}> {
  static defaultProps = {
    i18nPlaceholder: null,
    i18nPlaceholderParams: {},
    icon: null,
    iconSize: 0,
    iconColor: colors.primary300,
    value: '',
    uppercase: false,
    type: 'text',
  };

  render() {
    const {
      i18nPlaceholder,
      i18nPlaceholderParams,
      onChangeText,
      icon,
      iconSize,
      iconColor,
      value,
      type,
      uppercase,
      ...attributes
    } = this.props;

    let keyboardType = 'default';
    if (type === 'number') {
      keyboardType = 'number-pad';
    }
    if (type === 'email') {
      keyboardType = 'email-address';
    }

    let transformValue = value || '';
    if (uppercase) {
      transformValue = transformValue.toUpperCase();
    }

    return (
      <Input
        autoFocus
        onChangeText={text => onChangeText(text)}
        placeholder={I18n.t(i18nPlaceholder, i18nPlaceholderParams)}
        value={transformValue}
        keyboardType={keyboardType}
        leftIcon={icon ? (
          <FontAwesome5Pro
            size={iconSize}
            color={iconColor}
            name={icon}
          />
        ) : null}
        {...attributes}
      />
    );
  }
}

export default TWInput;
