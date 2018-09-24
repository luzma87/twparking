/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppWithNavigation from './app/navigation/AppWithNavigation';

// console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => AppWithNavigation);
