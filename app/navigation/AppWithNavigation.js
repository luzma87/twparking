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
import appNavigation from './Routes';

const theme = {
  colors: {
    primary: '#7e57c2',
    secondary: '#ff80ab',
  },
  Button: {
    buttonStyle: {
      borderRadius: 20,
    },
  },
};

const RootStack = createStackNavigator(appNavigation.routes,
  { initialRouteName: appNavigation.initialScreen });

const AppWithNavigation = () => (
  <ThemeProvider theme={theme}>
    <RootStack />
  </ThemeProvider>
);

export default AppWithNavigation;
