/* @flow */
import React, { Component } from 'react';
import type { MenuConfig, MenuType } from '../TWTabBar/TWTabBar';
import TWTabBar from '../TWTabBar/TWTabBar';
import TWTabBarHelper from '../TWTabBar/TWTabBarHelper';
import TWScreenWithNavigationBar from '../TWScreenWithNavigationBar';

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
      <TWScreenWithNavigationBar i18nTitle={this.getTitle()} bottomSeparator>
        <TWTabBar
          type={type}
          selectedTab={selectedTab}
          onChangeTab={key => this.changeTab(key)}
          menuConfig={menuConfig}
        />
      </TWScreenWithNavigationBar>
    );
  }
}

export default HomeScreen;
