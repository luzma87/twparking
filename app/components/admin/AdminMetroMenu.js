/* @flow */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import withContext from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import TWMetroButton from '../_common/TWFormControls/TWMetroButton';

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {};

class AdminMetroMenu extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    /*
    CRUDS
    logistics fees (cuentas, heroku, transferencias interbancarias, etc.)
     */
    const { context, navigation } = this.props;
    return (
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
          marginBottom: 16,
        }}
        >
          <TWText text={`this is the Admin screen [${context ? context.user.name : ''}]`} />
          <TWMetroButton
            i18n="toggles.toRegular"
            onPress={() => this.changeUser()}
            icon="user"
            tint="deepPurple"
            tintBase={300}
            widthRatio={3}
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Parking"
            onPress={() => navigation.navigate(appNavigation.navigationTree.ParkingScreen)}
            icon="warehouse"
            widthRatio={2}
            tint="blue"
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Owners"
            onPress={() => navigation.navigate(appNavigation.navigationTree.OwnersScreen)}
            icon="hat-wizard"
            tint="green"
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Users"
            onPress={() => {}}
            tintBase={300}
            icon="user-astronaut"
            tint="secondary"
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Cars"
            onPress={() => {}}
            icon="space-shuttle"
            widthRatio={2}
            tint="cyan"
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Fees"
            onPress={() => {}}
            icon="hand-holding-magic"
            tint="primary"
            widthRatio={3}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withContext(AdminMetroMenu);
