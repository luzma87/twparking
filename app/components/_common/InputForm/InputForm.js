/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../TWText/TWText';
import TWInput from '../TWFormControls/TWInput';
import styles from './inputFormStyles';

type Props = {
  field: string | number,
  onChangeText: (string) => void,
  i18nLabel: string,
  i18nPlaceholder: string,
  inputProps?: Object
};
type State = {};

class InputForm extends Component<Props, State> {
  static defaultProps = {
    inputProps: {},
  };

  render() {
    const {
      field, onChangeText, i18nLabel, i18nPlaceholder, inputProps,
    } = this.props;
    return (
      <View style={styles.container}>
        <TWText i18n={i18nLabel} style={{ width: 56, marginRight: 5 }} align="right" />
        <TWInput
          value={field ? field.toString() : ''}
          containerStyle={styles.inputContainer}
          onChangeText={value => onChangeText(value)}
          i18nPlaceholder={i18nPlaceholder}
          {...inputProps}
        />
      </View>
    );
  }
}

export default InputForm;
