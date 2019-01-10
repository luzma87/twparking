import LoginScreen from '../components/LoginScreen';
import UserHomeScreen from '../components/user/UserHomeScreen';
import AdminHomeScreen from '../components/admin/AdminHomeScreen';
import BankAccountInformationScreen
  from '../components/user/PaymentsTab/BankAccountInformationScreen';
import OwnerScreen from '../components/admin/ParkingSpots/OwnerScreen';

const routes = {
  Login: { screen: LoginScreen },
  UserHome: { screen: UserHomeScreen },
  AdminHome: { screen: AdminHomeScreen },
  BankInformation: { screen: BankAccountInformationScreen },
  OwnersScreen: { screen: OwnerScreen },
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
