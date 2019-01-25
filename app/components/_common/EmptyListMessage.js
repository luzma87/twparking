/* @flow */
import React from 'react';
import { View } from 'react-native';
import TWText from './TWText/TWText';

type Props = {
  type: string
};

const EmptyListMessage = (props: Props) => {
  const { type } = props;
  const i18nKey = `screens.admin.${type}.empty`;
  return (
    <View style={{
      alignItems: 'center', justifyContent: 'center', flex: 1, padding: 16,
    }}
    >
      <TWText i18n={i18nKey} weight="bold" multiline align="center" font="vt323" size="title" />
    </View>
  );
};
export default EmptyListMessage;
