/* @flow */
import React, { Component } from 'react';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import AdminProfile from './ProfileTab';
import PaymentsTab from './PaymentsTab';
import BalanceTab from './BalanceTab';
import ParkingTab from './ParkingTab';
import UsersTab from './UsersTab';
import TasksTab from './TasksTab';
import HomeScreen from '../_common/HomeScreen/HomeScreen';

type Props = {
  navigation: Object
}

class AdminHomeScreen extends Component<Props, {}> {
  static navigationOptions = navigationHeader.noHeader;

  render() {
    const { navigation } = this.props;
    const menuConfig = [
      { key: 'Admin', icon: 'user-secret', content: <AdminProfile navigation={navigation} /> },
      { key: 'Payments', icon: 'hand-holding-usd', content: <PaymentsTab /> },
      { key: 'Balance', icon: 'abacus', content: <BalanceTab /> },
      { key: 'Parking', icon: 'warehouse', content: <ParkingTab /> },
      { key: 'Users', icon: 'user-astronaut', content: <UsersTab /> },
      { key: 'Tasks', icon: 'cogs', content: <TasksTab /> },
    ];
    return <HomeScreen type="admin" menuConfig={menuConfig} />;
  }
}

export default AdminHomeScreen;
