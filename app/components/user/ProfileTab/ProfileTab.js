/* @flow */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import appNavigation from '../../../navigation/Routes';
import type { GlobalContext } from '../../../context/types';
import withContext from '../../../context/WithContext';

// eslint-disable-next-line import/no-unresolved
const skull1 = require('./images/skull1.png');
const crown = require('./images/crown_champ.png');

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {};

class ProfileTab extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  changeUser() {
    // firebase.auth().signOut();
    const { context } = this.props;
    // console.warn(this.props);
    const user = {
      name: 'Pepe',
    };
    if (context) {
      context.updateUser(user);
    }
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.AdminHome);
  }

  signOut() {
    const { navigation } = this.props;
    firebase.auth().signOut().then(() => {
      navigation.navigate(appNavigation.navigationTree.Login);
    });
  }

  render() {
    const { context } = this.props;
    return (
      <View style={{
        alignItems: 'center',
      }}
      >
        <View style={{
          alignItems: 'center',
          marginTop: 70,
        }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={skull1}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            imageProps={{
              resizeMode: 'contain',
            }}
          />
          <Image
            source={crown}
            resizeMode="contain"
            style={{
              height: 90,
              position: 'absolute',
              top: -60,
              left: -135,
              transform: [{ rotate: '15deg' }],
            }}
          />
        </View>
        {/* <TWText text={`this is the Profile screen [${context ? context.user.name : ''}]`} /> */}
        {/* <TWText i18n="title" /> */}
        {/* <TWText i18n="current" i18nParams={{ language: i18n.currentLocale() }} /> */}
        {/* <TWButton */}
        {/* i18n="toggles.toAdmin" */}
        {/* icon="user-secret" */}
        {/* onPress={() => this.changeUser()} */}
        {/* style={{ marginTop: 20 }} */}
        {/* /> */}
        {/* <TWButton */}
        {/* i18n="commons.logout" */}
        {/* buttonColor={colors.primary700} */}
        {/* onPress={() => this.signOut()} */}
        {/* style={{ marginTop: 40 }} */}
        {/* /> */}
      </View>
    );
  }
}

export default withContext(ProfileTab);
