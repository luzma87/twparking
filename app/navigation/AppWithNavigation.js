/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {ThemeProvider} from 'react-native-elements';
import appNavigation from './Routes';
import {colors} from '../styles/colors';

const theme = {
  colors: {
    primary: colors.primary400,
    secondary: colors.secondary200,
  },
  Button: {
    buttonStyle: {
      borderRadius: 5,
    },
  },
};

const RootStack = createStackNavigator(appNavigation.routes,
  {initialRouteName: appNavigation.initialScreen});

const AppWithNavigation = () => (
  <ThemeProvider theme={theme}>
    <RootStack/>
  </ThemeProvider>
);

export default AppWithNavigation;
