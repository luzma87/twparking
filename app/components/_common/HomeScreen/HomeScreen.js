/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import type { MenuConfig, MenuType } from '../TWTabBar/TWTabBar';
import TWTabBarHelper from '../TWTabBar/TWTabBarHelper';
import colors from '../../../styles/colors';
import deviceHelper from '../../../util/deviceHelper';
import TWHeader from '../TWHeader/TWHeader';
import TWTabBar from '../TWTabBar/TWTabBar';

type Props = {
  type: MenuType,
  menuConfig: MenuConfig
};

type State = {
  selectedTab: string
}

class HomeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: props.menuConfig[0].key,
    };
  }

  getTitle() {
    const { type } = this.props;
    const { selectedTab } = this.state;
    return TWTabBarHelper.getTitleCode(type, selectedTab);
  }

  changeTab(selectedTab: string) {
    this.setState({ selectedTab });
  }

  render() {
    const { type, menuConfig } = this.props;
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
        <TWTabBar
          type={type}
          selectedTab={selectedTab}
          onChangeTab={key => this.changeTab(key)}
          menuConfig={menuConfig}
        />
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

export default HomeScreen;
