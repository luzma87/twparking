/* @flow */
import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';

type Props = {
  onChangeText: (string) => void,

  i18nPlaceholder?: string,
  i18nPlaceholderParams?: Object,
  icon?: string,
  iconSize?: number,
  iconColor?: string,
  value?: string,
  type?: 'text' | 'number',
};

class TWInput extends Component<Props, {}> {
  static defaultProps: Props = {
    i18nPlaceholder: null,
    i18nPlaceholderParams: {},
    icon: null,
    iconSize: 0,
    iconColor: colors.primary300,
    value: '',
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
      ...attributes
    } = this.props;

    let keyboardType = 'text';
    if (type === 'number') {
      keyboardType = 'number-pad';
    }

    return (
      <Input
        autoFocus
        onChangeText={text => onChangeText(text)}
        placeholder={I18n.t(i18nPlaceholder, i18nPlaceholderParams)}
        value={value}
        keyboardType={keyboardType}
        leftIcon={(
          <FontAwesome5Pro
            size={iconSize}
            color={iconColor}
            name={icon}
          />
        )}
        {...attributes}
      />
    );
  }
}

export default TWInput;
