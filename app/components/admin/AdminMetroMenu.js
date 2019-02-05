/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import withContext from '../../context/WithContext';
import appNavigation from '../../navigation/Routes';
import TWMetroButton from '../_common/TWFormControls/TWMetroButton';

type Props = {
  navigation: Object,
};
type State = {};

class AdminMetroMenu extends Component<Props, State> {
  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    /*
    CRUDS
    logistics fees (cuentas, heroku, transferencias interbancarias, etc.)
     */
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
          marginBottom: 16,
        }}
        >
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
            i18n="screens.admin.home.tabs.Assignments"
            onPress={() => navigation.navigate(appNavigation.navigationTree.UsersParkingSpots)}
            icon="hand-holding-magic"
            tint="indigo"
            tintBase={400}
            widthRatio={3}
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Users"
            onPress={() => navigation.navigate(appNavigation.navigationTree.UsersScreen)}
            tintBase={300}
            icon="user-astronaut"
            tint="secondary"
          />
          <TWMetroButton
            i18n="screens.admin.home.tabs.Cars"
            onPress={() => navigation.navigate(appNavigation.navigationTree.UsersCars)}
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
