/* @flow */
import styles from '../navigation/navigationStyles';
import { colors } from '../styles/colors';

const commonHeader = {
  headerLeft: null,
  gesturesEnabled: false,
  headerTitleAllowFontScaling: false,
  headerBackTitle: false,
};

const commonHeaderWithTitle = title => ({
  headerStyle: styles.header,
  // title: I18n.t(titleI18nKey).toUpperCase(),
  title: title.toUpperCase(),
  headerTintColor: colors.primary500,
  headerTitleStyle: styles.headerTitle,
});

module.exports = {
  noHeader: {
    ...commonHeader,
    ...{ header: null },
  },
  header: (title: string) => ({
    ...commonHeader,
    ...commonHeaderWithTitle(title),
  }),
};
