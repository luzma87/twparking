/* @flow */
import React, { Component } from 'react';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import Profile from './ProfileTab';
import Payments from './PaymentsTab';
import HistoryTab from './HistoryTab';
import MoreTab from './MoreTab';
import CarTab from './CarTab';
import HomeScreen from '../_common/HomeScreen/HomeScreen';

type Props = {
  navigation: Object
}

class UserHomeScreen extends Component<Props, {}> {
  static navigationOptions = navigationHeader.noHeader;

  render() {
    const { navigation } = this.props;
    const menuConfig = [
      { key: 'Profile', icon: 'user-ninja', content: <Profile navigation={navigation} /> },
      { key: 'Car', icon: 'car-bump', content: <CarTab /> },
      { key: 'Payments', icon: 'money-bill-wave', content: <Payments /> },
      { key: 'History', icon: 'file-invoice', content: <HistoryTab /> },
      { key: 'More', icon: 'ellipsis-h', content: <MoreTab /> },
    ];
    return <HomeScreen type="user" menuConfig={menuConfig} />;
  }
}

export default UserHomeScreen;
