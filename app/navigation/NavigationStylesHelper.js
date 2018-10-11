/* @flow */

import styles from './navigationStyles';

const commonHeader = {
  headerLeft: null,
  gesturesEnabled: false,
  headerTitleAllowFontScaling: false,
  headerBackTitle: false,
};

const commonHeaderWithTitle = title => ({
  headerStyle: styles.header,
  title: title,
  // headerTintColor: colors.fiord3,
  // headerTitleStyle: styles.headerTitle,
});

module.exports = {
  noHeader: {
    ...commonHeader,
    ...{ header: null },
  },
  header: (title: string = 'TW Parking') => ({
    ...commonHeader,
    ...commonHeaderWithTitle(title),
  }),
};
