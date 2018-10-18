/* @flow */
import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TabNavigator from 'react-native-tab-navigator';
import { scale } from 'react-native-size-matters';
import { colors } from '../../styles/colors';
import TWHeader from '../_common/TWHeader/TWHeader';
import * as navigationHeader from "../../navigation/NavigationStylesHelper";

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

const menuItems = () => [
  {
    key: 'Profile',
    title: 'Profile',
    style: {},
    icon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#f50"
    />),
    selectedIcon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#000"
    />),
    menu: (<Text>Profile</Text>),
  },
  {
    key: 'Payments',
    title: 'Payments',
    style: {},
    icon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#f50"
    />),
    selectedIcon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#000"
    />),
    menu: (<Text>Payments</Text>),
  },
  {
    key: 'History',
    title: 'History',
    style: {},
    icon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#f50"
    />),
    selectedIcon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#000"
    />),
    menu: (<Text>History</Text>),
  },
  {
    key: 'More',
    title: 'More',
    style: {},
    icon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#f50"
    />),
    selectedIcon: (<Icon
      raised
      name="heartbeat"
      type="font-awesome"
      color="#000"
    />),
    menu: (<Text>More</Text>),
  },
];

// const HomeScreen = ({ navigation }: Props) => {
class HomeScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Profile',
    };
  }

  getTitle() {
    const { selectedTab } = this.state;
    switch (selectedTab) {
      case 'Profile':
        return 'Profile';
      case 'Payments':
        return 'Payments';
      case 'History':
        return 'History';
      case 'More':
        return 'More';
      default:
        return 'None';
    }
  }

  changeTab(selectedTab) {
    this.setState({ selectedTab });
  }

  render() {
    const { selectedTab } = this.state;
    const items = menuItems();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TWHeader title={this.getTitle()} onPress={null} />
        <TabNavigator tabBarStyle={{ height: scale(85) }}>
          {items.map(menuItem => (
            <TabNavigator.Item
              key={menuItem.key}
              titleStyle={{
                fontSize: scale(15),
                color: colors.gray2,
              }}
              tabStyle={
               [
                 {
                   borderBottomColor: colors.primary300,
                 },
               ]
             }
              selectedTitleStyle={{
                fontSize: scale(15),
                color: colors.primary500,
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
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
