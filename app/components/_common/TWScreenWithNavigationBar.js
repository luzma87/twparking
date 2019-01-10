/* @flow */
import React from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import BottomSeparator from './Separators/BottomSeparator';
import TWHeader from './TWHeader/TWHeader';

type Props = {
  i18nTitle: string,
  onPress?: ?() => void,
  bottomSeparator?: boolean,
  children: any
};

const TWScreenWithNavigationBar = (props: Props) => {
  const {
    i18nTitle, onPress, children, bottomSeparator,
  } = props;
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary100 }}>
      <TWHeader
        i18n={i18nTitle}
        onPress={onPress}
      />
      <View style={{ flex: 1 }}>
        {children}
      </View>
      {bottomSeparator ? <BottomSeparator /> : null}
    </View>
  );
};

TWScreenWithNavigationBar.defaultProps = {
  onPress: null,
  bottomSeparator: false,
};

export default TWScreenWithNavigationBar;
