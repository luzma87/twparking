/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { scale } from 'react-native-size-matters';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../styles/colors';
import TWHeader from '../_common/TWHeader/TWHeader';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import Profile from './ProfileTab';
import Payments from './PaymentsTab';
import HistoryTab from './HistoryTab';
import MoreTab from './MoreTab';
import fonts from '../../styles/fonts';
import deviceHelper from '../../util/deviceHelper';
import CarTab from './CarTab';

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

const getMenuItem = (key, iconName, menu) => ({
  key,
  title: `screens.user.home.tabs.${key}`,
  icon: getIcon(iconName),
  selectedIcon: getSelectedIcon(iconName),
  menu,
});

class UserHomeScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: this.menuItems()[0].key,
    };
  }

  getTitle() {
    const { selectedTab } = this.state;
    return `screens.user.home.tabs.${selectedTab}`;
  }

  menuItems() {
    const { navigation } = this.props;
    return [
      getMenuItem('Profile', 'user-ninja', <Profile navigation={navigation} />),
      getMenuItem('Car', 'car-bump', <CarTab />),
      getMenuItem('Payments', 'money-bill-wave', <Payments />),
      getMenuItem('History', 'file-invoice', <HistoryTab />),
      getMenuItem('More', 'ellipsis-h', <MoreTab />),
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
          <View
            style={{
              backgroundColor: colors.primary900,
              top: 0,
              right: 0,
              left: 0,
              height: 20,
              zIndex: -1000,
            }}
          />
        ) : null}
        <TWHeader
          titleI18n={this.getTitle()}
          onPress={null}
        />
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
        <View
          style={{
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

export default UserHomeScreen;
