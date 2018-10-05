/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppWithNavigation from './app/navigation/AppWithNavigation';
// import firebase from 'react-native-firebase';

// const config = {
//   databaseURL: "https://twparking-001.firebaseio.com",
//   projectId: "<project-id>",
// };
// firebase.initializeApp(config);
//
// console.warn('config', config);

// console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => AppWithNavigation);
