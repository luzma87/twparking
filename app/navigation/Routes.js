import UsersParkingSpotsScreen from '../components/admin/parkingSpots/userParkingSpot/UsersParkingSpotsScreen';
import LoginScreen from '../components/LoginScreen';
import UserHomeScreen from '../components/user/UserHomeScreen';
import AdminHomeScreen from '../components/admin/AdminHomeScreen';
import BankAccountInformationScreen
  from '../components/user/PaymentsTab/BankAccountInformationScreen';
import OwnerScreen from '../components/admin/parkingSpots/OwnerScreen';
import ParkingScreen from '../components/admin/parkingSpots/ParkingScreen';

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
