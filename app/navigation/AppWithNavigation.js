/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import RNLanguages from 'react-native-languages';
import { createStackNavigator } from 'react-navigation';
import { ThemeProvider } from 'react-native-elements';
import { StatusBar } from 'react-native';
import i18n from '../i18n';
import appNavigation from './Routes';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import GlobalProvider from '../context/GlobalProvider';

const theme = {
  colors: {
    primary: colors.primary400,
    secondary: colors.secondary200,
  },
  Input: {
    inputStyle: { fontFamily: fonts.vt323.regular, fontSize: 24 },
  },
};

const RootStack = createStackNavigator(appNavigation.routes,
  { initialRouteName: appNavigation.initialScreen });

class AppWithNavigation extends Component<{}, {}> {
  componentWillMount() {
    RNLanguages.addEventListener('change', this.onLanguagesChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.onLanguagesChange);
  }

  onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={colors.primary900}
          barStyle="light-content"
        />
        <GlobalProvider>
          <RootStack />
        </GlobalProvider>
      </ThemeProvider>
    );
  }
}
export default AppWithNavigation;
