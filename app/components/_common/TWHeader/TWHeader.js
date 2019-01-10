/* @flow */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './twHeaderStyles';
import TWBackButton from './TWBackButton';
import TWText from '../TWText/TWText';
import colors from '../../../styles/colors';
import deviceHelper from "../../../util/deviceHelper";

type Props = {
  i18n: string,
  onPress: ?() => void
};

const TWHeader = ({ i18n, onPress }: Props) => {
  const hasBackButton = onPress !== null;
  const otherStyles = hasBackButton ? styles.containerWithBackButton : {};
  const height = deviceHelper.isiPhoneX() ? 95 : 75;
  return (
    <View
      style={[
        {
          height,
          backgroundColor: colors.primary900,
        },
        styles.container,
        otherStyles,
      ]}
    >
      {hasBackButton ? <TWBackButton onPress={() => onPress && onPress()} /> : null}
      <TWText
        i18n={i18n}
        style={{ paddingTop: 20 }}
        uppercase
        // shadow
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
