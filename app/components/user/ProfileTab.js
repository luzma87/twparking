/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';

type Props = {
  navigation: Object
};
type State = {};

class Profile extends Component<Props, State> {
  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.AdminHome);
  }

  render() {
    return (
      <View>
        <TWText text="this is the profile screen" />
        <Button
          icon={(
            <FontAwesome5Pro
              solid
              size={16}
              name="user-secret"
              color="white"
            />
          )}
          title="Change to admin view"
          onPress={() => {
            this.changeUser();
          }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

export default Profile;
