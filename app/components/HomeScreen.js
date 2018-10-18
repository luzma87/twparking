/* @flow */
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import TabNavigator from 'react-native-tab-navigator';
import {scale} from 'react-native-size-matters';
import {colors} from '../styles/colors';
import TWHeader from './_common/TWHeader/TWHeader';
import navigationHeader from "../navigation/NavigationStylesHelper";
import Profile from "./Profile";
import Payments from "./Payments";
import History from "./History";
import More from "./More";

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

const iconColor = colors.primary800;
const selectedIconColor = colors.primary800;

const getIcon = (iconName) => (<Icon
  raised
  type="font-awesome"
  color={iconColor}
  name={iconName}
/>);

const getSelectedIcon = (iconName) => (<Icon
  raised
  reverse
  type="font-awesome"
  color={selectedIconColor}
  name={iconName}
/>);

const getMenuItem = (name, iconName, menu) => ({
  key: name,
  title: name,
  icon: getIcon(iconName),
  selectedIcon: getSelectedIcon(iconName),
  menu,
});

const menuItems = [
  getMenuItem('Profile', 'user', <Profile/>),
  getMenuItem('Payments', 'money', <Payments/>),
  getMenuItem('History', 'file-text-o', <History/>),
  getMenuItem('More', 'ellipsis-h', <More/>),
];

class HomeScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: menuItems[0].key,
    };
  }

  getTitle() {
    const {selectedTab} = this.state;
    return selectedTab;
  }

  changeTab(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const {selectedTab} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TWHeader title={this.getTitle()} onPress={null}/>
        <TabNavigator tabBarStyle={{height: scale(85)}}>
          {menuItems.map(menuItem => (
            <TabNavigator.Item
              key={menuItem.key}
              titleStyle={{
                fontSize: scale(15),
                color: colors.gray2,
              }}
              tabStyle={[{borderBottomColor: colors.primary300}]}
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
