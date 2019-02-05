/* @flow */
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';
import pickerSelectStyles from '../../admin/_common/PickerStyles';
import ColorTag from "../ColorTag";
import TWLabel from './TWLabel';

type Props = {
  value: string,
  onValueChange: string => void
};

const ColorPicker = (props: Props) => {
  const { value, onValueChange } = props;
  const rawColors = I18n.t('commons.color');
  const colorsArray = [];
  Object.keys(rawColors).forEach((colorKey) => {
    const rawColor = rawColors[colorKey];
    const size = {
      label: rawColor,
      value: colorKey,
    };
    colorsArray.push(size);
  });
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TWLabel i18nLabel="screens.admin.cars.create.form.color" />
      <RNPickerSelect
        placeholder={{
          label: I18n.t('screens.admin.cars.create.form.colorPlaceholder'),
          value: null,
          color: colors.secondary700,
        }}
        placeholderTextColor={colors.secondary700}
        style={{ ...pickerSelectStyles }}
        items={colorsArray}
        onValueChange={selected => onValueChange(selected)}
        value={value}
      />
    </View>
  );
};
export default ColorPicker;
