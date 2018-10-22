/* @flow */
import React, { Component } from 'react';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import AdminProfile from './ProfileTab';
import AdminPayments from './PaymentsTab';
import AdminBalance from './BalanceTab';
import AdminParkingTab from './ParkingTab';
import AdminUsers from './UsersTab';
import AdminTasks from './TasksTab';
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
      { key: 'Payments', icon: 'hand-holding-usd', content: <AdminPayments /> },
      { key: 'Balance', icon: 'abacus', content: <AdminBalance /> },
      { key: 'Parking', icon: 'warehouse', content: <AdminParkingTab /> },
      { key: 'Users', icon: 'user-astronaut', content: <AdminUsers /> },
      { key: 'Tasks', icon: 'unicorn', content: <AdminTasks /> },
    ];
    return <HomeScreen type="admin" menuConfig={menuConfig} />;
  }
}

export default AdminHomeScreen;
