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
  const otherStyles = {};
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
      <TWBackButton onPress={() => onPress && onPress()} visible={hasBackButton} />
      <TWText
        i18n={i18n}
        style={{ paddingTop: 20 }}
        uppercase
        weight="bold"
        font="vt323"
        size="title"
        color={colors.secondary500}
      />
      <TWBackButton onPress={null} visible={false} />
    </View>
  );
};

export default TWHeader;
