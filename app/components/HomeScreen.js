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
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import fonts from "../styles/fonts";

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

const iconColor = colors.primary800;
const selectedIconColor = colors.secondary500;

const getIcon = (iconName) => (<FontAwesome5Pro
  light
  color={iconColor}
  size={30}
  name={iconName}
/>);

const getSelectedIcon = (iconName) => (<FontAwesome5Pro
  solid
  color={selectedIconColor}
  size={30}
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
  getMenuItem('Profile', 'user-ninja', <Profile/>),
  getMenuItem('Payments', 'money-bill-wave', <Payments/>),
  getMenuItem('History', 'file-invoice', <History/>),
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
        <TabNavigator tabBarStyle={{height: scale(65)}}>
          {menuItems.map(menuItem => (
            <TabNavigator.Item
              key={menuItem.key}
              titleStyle={{
                fontFamily: fonts.vt323.regular,
                fontSize: scale(15),
                color: colors.primary500,
              }}
              tabStyle={[{borderBottomColor: colors.primary300}]}
              selectedTitleStyle={{
                fontSize: scale(15),
                color: colors.secondary500,
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
