/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import RNLanguages from 'react-native-languages';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import GlobalProvider from '../context/GlobalProvider';
import i18n from '../i18n';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import appNavigation from './Routes';

const theme = {
  colors: {
    primary: colors.primary400,
    secondary: colors.secondary200,
  },
  Input: {
    inputStyle: { fontFamily: fonts.vt323.regular, fontSize: 24 },
  },
};

const RootStack = createAppContainer(
  createStackNavigator(appNavigation.routes,
    { initialRouteName: appNavigation.initialScreen }),
);

class AppWithNavigation extends Component<{}, {}> {
  componentWillMount() {
    RNLanguages.addEventListener('change', this.onLanguagesChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.onLanguagesChange);
  }

  onLanguagesChange = ({ language }: Object) => {
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
