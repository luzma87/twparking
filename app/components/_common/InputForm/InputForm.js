/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import TWText from '../TWText/TWText';
import TWInput from '../TWFormControls/TWInput';
import styles from './inputFormStyles';

type Props = {
  field: string | number,
  onChangeText?: (string) => void,
  i18nLabel: string,
  i18nPlaceholder: string,
  uppercase?: boolean,
  labelPadding?: number,
  inputProps?: Object
};
type State = {};

class InputForm extends Component<Props, State> {
  static defaultProps = {
    inputProps: {},
    uppercase: false,
    labelPadding: scale(60),
    onChangeText: () => {},
  };

  render() {
    const {
      field, onChangeText, i18nLabel, i18nPlaceholder, inputProps, uppercase, labelPadding,
    } = this.props;
    const paddingRight = labelPadding > 60 ? '18%' : '10%';
    return (
      <View style={styles.container}>
        <TWText
          i18n={i18nLabel}
          style={{ width: scale(labelPadding), marginRight: 5 }}
          align="right"
        />
        <TWInput
          value={field ? field.toString() : ''}
          containerStyle={[styles.inputContainer, { paddingRight }]}
          onChangeText={value => onChangeText(value)}
          i18nPlaceholder={i18nPlaceholder}
          uppercase={uppercase}
          {...inputProps}
        />
      </View>
    );
  }
}

export default InputForm;
