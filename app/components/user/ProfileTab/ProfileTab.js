/* @flow */
import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import _ from 'lodash';
import appNavigation from '../../../navigation/Routes';
import type { GlobalContext } from '../../../context/types';
import withContext from '../../../context/WithContext';
import TWCornerRibbon from '../../_common/TWCornerRibbon/TWCornerRibbon';
import InputForm from '../../_common/InputForm/InputForm';
import TWButton from '../../_common/TWFormControls/TWButton';
import colors from '../../../styles/colors';

const crown = require('./images/crown_champ.png');
const skull1 = require('./images/skull1.png');
const skull2 = require('./images/skull2.png');
const skull3 = require('./images/skull3.png');
const skull4 = require('./images/skull4.png');
const skull5 = require('./images/skull5.png');
const skull6 = require('./images/skull6.png');
const skull7 = require('./images/skull7.png');
const skull8 = require('./images/skull8.png');
const skull9 = require('./images/skull9.png');
const skull10 = require('./images/skull10.png');
const skull11 = require('./images/skull11.png');
const skull12 = require('./images/skull12.png');

const avatars = [
  skull1, skull2, skull3, skull4, skull5, skull6, skull7, skull8, skull9, skull10, skull11, skull12,
];

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {
  user: Object
};

class ProfileTab extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    firebase.auth().onAuthStateChanged((user) => {
      const { phoneNumber } = user.toJSON();
      firebase.database()
        .ref('people')
        .orderByChild('phone')
        .equalTo(phoneNumber)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const keys = Object.keys(snapshot.val());
            const key = keys[0];
            this.setState({ user: snapshot.val()[key] });
          }
        }, () => {});
    });
  }

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

  mergeUser(newData) {
    const { user } = this.state;
    const newUser = { ...user, ...newData };
    this.setState({ user: newUser });
  }

  render() {
    const {
      user,
    } = this.state;
    return (
      <ScrollView>
        <View style={{ alignItems: 'center', paddingBottom: 10 }}>
          <TWCornerRibbon i18n="commons.champion" />
          <View style={{
            alignItems: 'center',
            marginTop: 70,
          }}
          >
            <Avatar
              rounded
              size="xlarge"
              source={_.sample(avatars)}
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
          <View style={{ paddingLeft: 40, paddingRight: 20 }}>
            <InputForm
              field={user.name}
              i18nLabel="screens.user.profile.form.name"
              i18nPlaceholder="screens.user.profile.form.namePlaceholder"
              onChangeText={(value) => { this.mergeUser({ name: value }); }}
            />
            <InputForm
              field={user.phone}
              i18nLabel="screens.user.profile.form.phone"
              i18nPlaceholder="screens.user.profile.form.phonePlaceholder"
              onChangeText={(value) => { this.mergeUser({ phone: value }); }}
            />
            <InputForm
              field={user.bank}
              i18nLabel="screens.user.profile.form.bank"
              i18nPlaceholder="screens.user.profile.form.bankPlaceholder"
              onChangeText={(value) => { this.mergeUser({ bank: value }); }}
            />
            <InputForm
              field={user.ci}
              i18nLabel="screens.user.profile.form.ci"
              inputProps={{ editable: false }}
              i18nPlaceholder="screens.user.profile.form.ciPlaceholder"
              onChangeText={(value) => { this.mergeUser({ ci: value }); }}
            />
            <InputForm
              field={user.user}
              i18nLabel="screens.user.profile.form.username"
              inputProps={{ editable: false }}
              i18nPlaceholder="screens.user.profile.form.usernamePlaceholder"
              onChangeText={(value) => { this.mergeUser({ username: value }); }}
            />
          </View>
          <TWButton
            i18n="toggles.toAdmin"
            buttonColor={colors.primary700}
            onPress={() => this.changeUser()}
            style={{ marginVertical: 40 }}
          />
          <TWButton
            i18n="commons.logout"
            buttonColor={colors.primary700}
            onPress={() => this.signOut()}
            style={{ marginVertical: 10 }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withContext(ProfileTab);
