/* @flow */
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import I18n from '../../../i18n';
import colors from '../../../styles/colors';
import pickerSelectStyles from '../../admin/_common/PickerStyles';
import TWLabel from './TWLabel';

type Props = {
  value: string,
  onValueChange: string => void
};

const SizePicker = (props: Props) => {
  const { value, onValueChange } = props;
  const rawSizes = I18n.t('commons.size');
  const sizes = [];
  Object.keys(rawSizes).forEach((sizeKey) => {
    const rawSize = rawSizes[sizeKey];
    const size = {
      label: rawSize,
      value: sizeKey,
    };
    sizes.push(size);
  });
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TWLabel i18nLabel="screens.admin.cars.create.form.size" />
      <RNPickerSelect
        placeholder={{
          label: I18n.t('screens.admin.cars.create.form.sizePlaceholder'),
          value: null,
          color: colors.secondary700,
        }}
        placeholderTextColor={colors.secondary700}
        style={{ ...pickerSelectStyles }}
        items={sizes}
        onValueChange={selected => onValueChange(selected)}
        value={value}
      />
    </View>
  );
};
export default SizePicker;
