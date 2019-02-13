/* @flow */
import React from 'react';
import { scale } from 'react-native-size-matters';
import TabNavigator from 'react-native-tab-navigator';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import I18n from '../../../i18n';
import TWTabBarHelper from './TWTabBarHelper';
import withContext from '../../../context/WithContext';

export type MenuType = 'user' | 'admin';
type MenuConfigItem = {
  key: string,
  icon: string,
  content: Object,
};
export type MenuConfig = Array<MenuConfigItem>;

type Props = {
  selectedTab: string,
  onChangeTab: (string) => void,
  menuConfig: MenuConfig,
  type: MenuType,
  context: Object,
};

const iconColor = colors.primary400;
const iconDisabledColor = colors.primary700;
const selectedIconColor = colors.secondary500;

const getIcon = (iconName, tabEnabled) => (
  <FontAwesome5Pro
    light
    color={tabEnabled ? iconColor : iconDisabledColor}
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

const getMenuItem = (
  type,
  { key, icon, content },
  tabEnabled
) => ({
  key,
  title: TWTabBarHelper.getTitleCode(type, key),
  icon: getIcon(icon, tabEnabled),
  selectedIcon: getSelectedIcon(icon),
  menu: content
});

const TWTabBar = ({
  selectedTab, onChangeTab, menuConfig, type, context
}: Props) => (
  <TabNavigator tabBarStyle={{ height: scale(65), backgroundColor: colors.primary900 }}>
    {menuConfig.map((menuConfigItem) => {
      const { user } = context;
      const { key: tabKey } = menuConfigItem;
      const isDefaultTab = ["Profile", "Car"].includes(tabKey);
      const tabsEnabled = !!user.car && !!user.spot;
      const enableTab = isDefaultTab || tabsEnabled;
      const menuItem = getMenuItem(type, menuConfigItem, enableTab);
      const changeTab = (tabEnabled: boolean, tabKey: string): void => {
        if (tabEnabled || isDefaultTab) {
          onChangeTab(tabKey)
        }
      }

      return (
        <TabNavigator.Item
          key={menuItem.key}
          titleStyle={{
            fontFamily: fonts.vt323.regular,
            fontSize: scale(15),
            color: enableTab ? iconColor : iconDisabledColor,
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
          onPress={() => changeTab(tabsEnabled, menuItem.key)}
        >
          {menuItem.menu}
        </TabNavigator.Item>
      );
    })}
  </TabNavigator>
);

export default withContext(TWTabBar);
