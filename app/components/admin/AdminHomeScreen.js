/* @flow */
import React, { Component } from 'react';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import AdminProfile from './ProfileTab';
import PaymentsTab from './PaymentsTab';
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
      { key: 'Logistics', icon: 'hand-holding-usd', content: <PaymentsTab /> },
    ];
    return <HomeScreen type="admin" menuConfig={menuConfig} />;
  }
}

export default AdminHomeScreen;
