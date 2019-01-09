/* @flow */
import React, { Component } from 'react';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import AdminMetroMenu from './AdminMetroMenu';
import PaymentsMetroMenu from './PaymentsMetroMenu';
import HomeScreen from '../_common/HomeScreen/HomeScreen';

type Props = {
  navigation: Object
}

class AdminHomeScreen extends Component<Props, {}> {
  static navigationOptions = navigationHeader.noHeader;

  render() {
    const { navigation } = this.props;
    const menuConfig = [
      { key: 'Payments', icon: 'hand-holding-usd', content: <PaymentsMetroMenu navigation={navigation} /> },
      { key: 'Admin', icon: 'user-secret', content: <AdminMetroMenu navigation={navigation} /> },
    ];
    return <HomeScreen type="admin" menuConfig={menuConfig} />;
  }
}

export default AdminHomeScreen;
