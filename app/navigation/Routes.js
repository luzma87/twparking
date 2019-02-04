import AdminHomeScreen from '../components/admin/AdminHomeScreen';
import OwnerScreen from '../components/admin/parkingSpots/OwnerScreen';
import ParkingScreen from '../components/admin/parkingSpots/ParkingScreen';
import UsersParkingSpotsScreen from '../components/admin/parkingSpots/UsersParkingSpotsScreen';
import LoginScreen from '../components/LoginScreen';
import BankAccountInformationScreen from '../components/user/PaymentsTab/BankAccountInformationScreen';
import UserHomeScreen from '../components/user/UserHomeScreen';

const routes = {
  Login: { screen: LoginScreen },
  UserHome: { screen: UserHomeScreen },
  AdminHome: { screen: AdminHomeScreen },
  BankInformation: { screen: BankAccountInformationScreen },
  OwnersScreen: { screen: OwnerScreen },
  ParkingScreen: { screen: ParkingScreen },
  UsersParkingSpots: { screen: UsersParkingSpotsScreen },
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
