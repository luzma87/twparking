/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';

type Props = {
  navigation: Object,
};
type State = {};

class AdminProfile extends Component<Props, State> {
  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    return (
      <View>
        <TWText text="this is the AdminProfile screen" />

        <Button
          icon={(
            <FontAwesome5Pro
              solid
              size={16}
              name="user-ninja"
              color="white"
            />
          )}
          title="Change to normal view"
          onPress={() => {
            this.changeUser();
          }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

export default AdminProfile;
