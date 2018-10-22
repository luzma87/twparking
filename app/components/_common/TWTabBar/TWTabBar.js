/* @flow */
import React from 'react';
import { scale } from 'react-native-size-matters';
import TabNavigator from 'react-native-tab-navigator';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import I18n from '../../../i18n';
import TWTabBarHelper from './TWTabBarHelper';

export type MenuType = 'user' | 'admin';
 type MenuConfigItem = {
  key: string,
  icon: string,
  content: Object
};
export type MenuConfig = Array<MenuConfigItem>;

type Props = {
  selectedTab: string,
  onChangeTab: (string) => void,
  menuConfig: MenuConfig,
  type: MenuType
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

const getMenuItem = (type, config) => ({
  key: config.key,
  title: TWTabBarHelper.getTitleCode(type, config.key),
  icon: getIcon(config.icon),
  selectedIcon: getSelectedIcon(config.icon),
  menu: config.content,
});

const TWTabBar = ({
  selectedTab, onChangeTab, menuConfig, type,
}: Props) => (
  <TabNavigator tabBarStyle={{ height: scale(65), backgroundColor: colors.primary900 }}>
    {menuConfig.map((menuConfigItem) => {
      const menuItem = getMenuItem(type, menuConfigItem);
      return (
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
          title={I18n.t(menuItem.title)}
          renderIcon={() => menuItem.icon}
          renderSelectedIcon={() => menuItem.selectedIcon}
          onPress={() => onChangeTab(menuItem.key)}
        >
          {menuItem.menu}
        </TabNavigator.Item>
      );
    })}
  </TabNavigator>
);

export default TWTabBar;
