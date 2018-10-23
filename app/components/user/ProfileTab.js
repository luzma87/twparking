/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import { withContext } from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import i18n from '../../i18n';
import TWButton from "../_common/TWButton/TWButton";

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
    context.updateUser(user);
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.AdminHome);
  }

  render() {
    const { context } = this.props;
    return (
      <View>
        <TWText text={`this is the Profile screen [${context ? context.user.name : ''}]`} />
        <TWText i18n="title" />
        <TWText i18n="current" i18nParams={{ language: i18n.currentLocale() }} />
        <TWButton
          i18n="toggles.toAdmin"
          icon="user-secret"
          onPress={() => this.changeUser()}
        />
      </View>
    );
  }
}

export default withContext(ProfileTab);
