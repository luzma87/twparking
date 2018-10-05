/**
 * Sample React Native MainScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import appNavigation from './Routes';

const RootStack = createStackNavigator(appNavigation.routes,
  { initialRouteName: appNavigation.initialScreen });

const AppWithNavigation = () => <RootStack />;

export default AppWithNavigation;
