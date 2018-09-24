import MainScreen from '../components/mainScreen/MainScreen';
import SecondScreen from '../components/secondScreen/SecondScreen';

const routes = {
  Home: {
    screen: MainScreen,
    title: 'Home',
  },
  Second: {
    screen: SecondScreen,
    title: 'Second Screen',
  },
};

const routesKeys = Object.keys(routes);
const navigationTree = {};
routesKeys.forEach((route) => {
  navigationTree[route] = { key: route, routeName: route };
});

const appNavigation = {
  routes,
  navigationTree,
};

export default appNavigation;
