/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import colors from '../../styles/colors';
import TWHeader from '../_common/TWHeader/TWHeader';
import navigationHeader from '../../navigation/NavigationStylesHelper';
import Profile from './ProfileTab';
import Payments from './PaymentsTab';
import HistoryTab from './HistoryTab';
import MoreTab from './MoreTab';
import deviceHelper from '../../util/deviceHelper';
import CarTab from './CarTab';
import TWTabBar from '../_common/TWTabBar/TWTabBar';
import TWTabBarHelper from '../_common/TWTabBar/TWTabBarHelper';

type Props = {
  navigation: Object
}

type State = {
  selectedTab: string,
};

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
    return TWTabBarHelper.getTitleCode('user', selectedTab);
  }

  menuItems() {
    const { navigation } = this.props;
    return [
      { key: 'Profile', icon: 'user-ninja', content: <Profile navigation={navigation} /> },
      { key: 'Car', icon: 'car-bump', content: <CarTab /> },
      { key: 'Payments', icon: 'money-bill-wave', content: <Payments /> },
      { key: 'History', icon: 'file-invoice', content: <HistoryTab /> },
      { key: 'More', icon: 'ellipsis-h', content: <MoreTab /> },
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
        <TWTabBar
          type="user"
          selectedTab={selectedTab}
          onChangeTab={key => this.changeTab(key)}
          menuConfig={this.menuItems()}
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

export default UserHomeScreen;
