/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import TWHeader from '../_common/TWHeader/TWHeader';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import deviceHelper from '../../util/deviceHelper';
import AdminProfile from './ProfileTab';
import AdminPayments from './PaymentsTab';
import AdminBalance from './BalanceTab';
import AdminParkingTab from './ParkingTab';
import AdminUsers from './UsersTab';
import AdminTasks from './TasksTab';
import TWTabBarHelper from '../_common/TWTabBar/TWTabBarHelper';
import TWTabBar from '../_common/TWTabBar/TWTabBar';

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

class AdminHomeScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: this.menuItems()[0].key,
    };
  }

  getTitle() {
    const { selectedTab } = this.state;
    return TWTabBarHelper.getTitleCode('admin', selectedTab);
  }

  menuItems() {
    const { navigation } = this.props;
    return [
      { key: 'Admin', icon: 'user-secret', content: <AdminProfile navigation={navigation} /> },
      { key: 'Payments', icon: 'hand-holding-usd', content: <AdminPayments /> },
      { key: 'Balance', icon: 'abacus', content: <AdminBalance /> },
      { key: 'Parking', icon: 'warehouse', content: <AdminParkingTab /> },
      { key: 'Users', icon: 'user-astronaut', content: <AdminUsers /> },
      { key: 'Tasks', icon: 'unicorn', content: <AdminTasks /> },
    ];
  }

  changeTab(selectedTab: string) {
    this.setState({ selectedTab });
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary100 }}>
        {deviceHelper.isiPhoneX() ? (
          <View style={{
            backgroundColor: colors.primary900,
            top: 0,
            right: 0,
            left: 0,
            height: 20,
            zIndex: -1000,
          }}
          />
        ) : null}
        <TWHeader titleI18n={this.getTitle()} onPress={null} />
        <TWTabBar
          type="admin"
          selectedTab={selectedTab}
          onChangeTab={key => this.changeTab(key)}
          menuConfig={this.menuItems()}
        />
        <View style={{
          backgroundColor: colors.primary900,
          bottom: 0,
          right: 0,
          left: 0,
          height: deviceHelper.isiPhoneX() ? 25 : 10,
          zIndex: -1000,
        }}
        />
      </View>
    );
  }
}

export default AdminHomeScreen;
