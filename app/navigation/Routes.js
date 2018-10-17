import SecondScreen from '../components/secondScreen/SecondScreen';
import LoginScreen from '../components/loginScreen/LoginScreen';
import HomeScreen from '../components/homeScreen/HomeScreen';

const routes = {
  Login: {
    screen: LoginScreen,
    title: 'Login',
  },
  Home: {
    screen: HomeScreen,
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
  initialScreen: 'Login',
};

export default appNavigation;
