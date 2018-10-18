/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ThemeProvider } from 'react-native-elements';
import { StatusBar } from 'react-native';
import appNavigation from './Routes';
import { colors } from '../styles/colors';
import fonts from '../styles/fonts';

const theme = {
  colors: {
    primary: colors.primary400,
    secondary: colors.secondary200,
  },
  Input: {
    inputStyle: { fontFamily: fonts.vt323.regular, fontSize: 24 },
  },
  Button: {
    titleStyle: {
      fontFamily: fonts.vt323.regular,
      fontSize: 24,
    },
    buttonStyle: {
      backgroundColor: colors.secondary500,
      borderRadius: 5,
    },
  },
};

const RootStack = createStackNavigator(appNavigation.routes,
  { initialRouteName: appNavigation.initialScreen });

const AppWithNavigation = () => (
  <ThemeProvider theme={theme}>
    <StatusBar
      backgroundColor={colors.primary900}
      barStyle="light-content"
    />
    <RootStack />
  </ThemeProvider>
);

export default AppWithNavigation;
