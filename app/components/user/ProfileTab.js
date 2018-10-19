/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import { withContext } from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import i18n from '../../i18n';

type Props = {
  navigation: Object,
  context: GlobalContext
};
type State = {};

class Profile extends Component<Props, State> {
  changeUser() {
    // firebase.auth().signOut();
    const { context } = this.props;
    console.warn(this.props);
    const user = {
      name: 'Pepe',
    };
    context.updateUser(user);
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.AdminHome);
  }

  render() {
    return (
      <View>
        <TWText text={`this is the profile screen [${this.props.context.user.name}]`} />
        <TWText text={i18n.t('title')} />
        <TWText text={i18n.t('current', { language: i18n.currentLocale() })} />
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

export default withContext(Profile);
