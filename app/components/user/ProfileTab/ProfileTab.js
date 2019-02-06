/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Rating } from 'react-native-elements';
import appNavigation from '../../../navigation/Routes';
import type { GlobalContext } from '../../../context/types';
import withContext from '../../../context/WithContext';
import TWCornerRibbon from '../../_common/TWCornerRibbon/TWCornerRibbon';
import InputForm from '../../_common/InputForm/InputForm';
import colors from '../../../styles/colors';
import UserAvatar from './UserAvatar';
import TWMetroButton from '../../_common/TWFormControls/TWMetroButton';

const CAR_RATING_IMAGE = require('../../../../assets/images/ratingCarGrayBg.png');

const isEmpty = (object: Object) => Object.keys(object).length === 0;

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
    const { context } = this.props;
    if (context) {
      firebase.auth().onAuthStateChanged((authUser) => {
        const { phoneNumber } = authUser.toJSON();
        firebase.database()
          .ref('people')
          .orderByChild('phone')
          .equalTo(phoneNumber)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              const keys = Object.keys(snapshot.val());
              const key = keys[0];
              const { user } = this.state;
              if (isEmpty(user)) {
                this.setState({ user: snapshot.val()[key] });
                context.updateUser(snapshot.val()[key]);
              }
            }
          }, () => {
          });
      });
    }
  }

  changeUser() {
    // firebase.auth().signOut();
    const { context } = this.props;
    // console.warn(this.props);
    const user = {
      name: 'Pepe',
      car: {
        plate: 'AAA-000',
      },
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
    if (isEmpty(user)) {
      return null;
    }
    const parkingStars = parseInt(user.parkingStars, 10);
    return (
      <ScrollView>
        <View style={{ alignItems: 'center', paddingBottom: 10 }}>
          {user.champion ? <TWCornerRibbon i18n="commons.champion" /> : null}
          <UserAvatar isAdmin={user.admin} style={{ marginTop: 60 }} />
          <View style={{
            paddingLeft: 40, paddingRight: 20, width: '100%',
          }}
          >
            <Rating
              type="custom"
              ratingImage={CAR_RATING_IMAGE}
              ratingColor={colors.secondary500}
              ratingBackgroundColor={colors.primary200}
              startingValue={parkingStars}
              readonly
              imageSize={40}
              style={{ marginTop: 16 }}
            />
            <InputForm
              field={user.name}
              i18nLabel="screens.user.profile.form.name"
              i18nPlaceholder="screens.user.profile.form.namePlaceholder"
              onChangeText={(value) => {
                this.mergeUser({ name: value });
              }}
              inputProps={{ editable: false }}
            />
            <InputForm
              field={user.phone}
              i18nLabel="screens.user.profile.form.phone"
              i18nPlaceholder="screens.user.profile.form.phonePlaceholder"
              onChangeText={(value) => {
                this.mergeUser({ phone: value });
              }}
              inputProps={{ editable: false }}
            />
            <InputForm
              field={user.bank}
              i18nLabel="screens.user.profile.form.bank"
              i18nPlaceholder="screens.user.profile.form.bankPlaceholder"
              onChangeText={(value) => {
                this.mergeUser({ bank: value });
              }}
              inputProps={{ editable: false }}
            />
            <InputForm
              field={user.ci}
              i18nLabel="screens.user.profile.form.ci"
              inputProps={{ editable: false }}
              i18nPlaceholder="screens.user.profile.form.ciPlaceholder"
              onChangeText={(value) => {
                this.mergeUser({ ci: value });
              }}
            />
            <InputForm
              field={user.user}
              i18nLabel="screens.user.profile.form.username"
              inputProps={{ editable: false }}
              i18nPlaceholder="screens.user.profile.form.usernamePlaceholder"
              onChangeText={(value) => {
                this.mergeUser({ username: value });
              }}
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            {user.admin ? (
              <TWMetroButton
                i18n="toggles.toAdmin"
                icon="user-ninja"
                widthRatio={3}
                tint="secondary"
                tintBase={700}
                onPress={() => this.changeUser()}
              />
            ) : null}
            <TWMetroButton
              i18n="commons.logout"
              icon="sign-out"
              tint="primary"
              tintBase={700}
              onPress={() => this.signOut()}
              widthRatio={3}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withContext(ProfileTab);
