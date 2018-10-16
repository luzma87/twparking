/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppWithNavigation from './app/navigation/AppWithNavigation';

AppRegistry.registerComponent(appName, () => AppWithNavigation);
