/* @flow */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './twHeaderStyles';
import TWBackButton from './TWBackButton';
import TWText from '../TWText/TWText';
import { colors } from '../../../styles/colors';

type Props = { title: string, onPress: () => void };

const TWHeader = ({ title, onPress }: Props) => {
  const hasBackButton = onPress !== null;
  const otherStyles = hasBackButton ? styles.containerWithBackButton : {};
  return (
    <View
      style={[
        {
          height: 70,
          backgroundColor: colors.primary900,
        },
        styles.container,
        otherStyles,
      ]}
    >
      {hasBackButton ? <TWBackButton onPress={() => onPress()} /> : null}
      <TWText
        text={title}
        uppercase
        shadow
        weight="bold"
        font="vt323"
        size="title"
        color={colors.secondary500}
      />
      {hasBackButton ? <View style={{ width: 35 }} /> : null}
    </View>
  );
};

export default TWHeader;
