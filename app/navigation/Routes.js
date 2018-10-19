import LoginScreen from '../components/LoginScreen';
import HomeScreen from '../components/HomeScreen';
import AdminHomeScreen from '../components/admin/AdminHomeScreen';

const routes = {
  Login: {
    screen: LoginScreen,
    title: 'Login',
  },
  Home: {
    screen: HomeScreen,
    title: 'Home',
  },
  AdminHome: {
    screen: AdminHomeScreen,
    title: 'AdminHome',
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
