/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { scale } from 'react-native-size-matters';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../styles/colors';
import TWHeader from '../_common/TWHeader/TWHeader';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import fonts from '../../styles/fonts';
import deviceHelper from '../../util/deviceHelper';
import AdminProfile from './ProfileTab';
import AdminPayments from './PaymentsTab';
import AdminBalance from './BalanceTab';
import AdminParkingTab from './ParkingTab';
import AdminUsers from './UsersTab';
import AdminTasks from './TasksTab';

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

const iconColor = colors.primary400;
const selectedIconColor = colors.secondary500;

const getIcon = iconName => (
  <FontAwesome5Pro
    light
    color={iconColor}
    size={30}
    name={iconName}
  />
);

const getSelectedIcon = iconName => (
  <FontAwesome5Pro
    solid
    color={selectedIconColor}
    size={30}
    name={iconName}
  />
);

const getMenuItem = (name, iconName, menu) => ({
  key: name,
  title: name,
  icon: getIcon(iconName),
  selectedIcon: getSelectedIcon(iconName),
  menu,
});

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
    return selectedTab;
  }

  menuItems() {
    const { navigation } = this.props;
    return [
      getMenuItem('Admin', 'user-secret', <AdminProfile navigation={navigation} />),
      getMenuItem('Payments', 'hand-holding-usd', <AdminPayments />),
      getMenuItem('Balance', 'abacus', <AdminBalance />),
      getMenuItem('Parking', 'warehouse', <AdminParkingTab />),
      getMenuItem('Users', 'user-astronaut', <AdminUsers />),
      getMenuItem('Tasks', 'unicorn', <AdminTasks />),
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
        <TWHeader title={this.getTitle()} onPress={null} />
        <TabNavigator tabBarStyle={{ height: scale(65), backgroundColor: colors.primary900 }}>
          {this.menuItems().map(menuItem => (
            <TabNavigator.Item
              key={menuItem.key}
              titleStyle={{
                fontFamily: fonts.vt323.regular,
                fontSize: scale(15),
                color: iconColor,
              }}
              tabStyle={[{ borderBottomColor: colors.primary300 }]}
              selectedTitleStyle={{
                fontSize: scale(15),
                color: selectedIconColor,
              }}
              selected={selectedTab === menuItem.key}
              title={menuItem.title}
              renderIcon={() => menuItem.icon}
              renderSelectedIcon={() => menuItem.selectedIcon}
              onPress={() => this.changeTab(menuItem.key)}
            >
              {menuItem.menu}
            </TabNavigator.Item>
          ))}
        </TabNavigator>
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
