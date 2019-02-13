/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import appNavigation from '../navigation/Routes';
import colors from '../styles/colors';
import TWHeader from './_common/TWHeader/TWHeader';
import navigationHeader from '../navigation/NavigationStylesHelper';
import TWText from './_common/TWText/TWText';
import TWButton from './_common/TWFormControls/TWButton';
import TWInput from './_common/TWFormControls/TWInput';
import TWScreenWithNavigationBar from './_common/TWScreenWithNavigationBar';

type Props = {
  navigation: Object
};
type State = {
  user: ?Object,
  message: string,
  messageParam: Object,
  codeInput: string,
  phoneNumber: string,
  confirmResult: ?Object
};

const inputIconSize = 16;

class LoginScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      messageParam: {},
      codeInput: '',
      phoneNumber: '+593',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { phoneNumber } = user;
        this._checkUserByPhone(
          phoneNumber,
          () => this.setState({ user: user.toJSON() }, () => {
            // redirect here
            const { navigation } = this.props;
            navigation.navigate(appNavigation.navigationTree.UserHome);
          }),
          this._resetState() 
        )
      } else {
        // User has been signed out, reset the state
        this._resetState();
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  unsubscribe = () => {
  };

  signIn = () => {
    const { phoneNumber } = this.state;
    this._checkUserByPhone(
      phoneNumber,
      () => this.signInWithPhoneNumber(phoneNumber),
      () => this.setState({ message: 'screens.login.errors.notAllowed', messageParam: {} })
    );
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
      // eslint-disable-next-line no-unused-vars
        .then((user) => {
          this.setState({ message: 'screens.login.codeConfirmed', messageParam: {} });
        })
        .catch(error => this.setState({
          message: 'screens.login.errors.codeConfirm',
          messageParam: { message: error.message },
        }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  signInWithPhoneNumber(phoneNumber: string) {
    this.setState({ message: 'screens.login.codeSending', messageParam: {} });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState(
        { confirmResult, message: 'screens.login.codeSent', messageParam: {} }))
      .catch(
        error => {
          console.warn('error.message', error.message);
          this.setState(
            { message: 'screens.login.errors.signIn', messageParam: { message: error.message } },
          );
        },
      );
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <TWText i18n="screens.login.form.phoneLabel"/>
        <TWInput
          value={phoneNumber}
          containerStyle={{ marginTop: 15, marginBottom: 20 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          i18nPlaceholder="screens.login.form.phonePlaceholder"
          type="number"
          icon="mobile-android-alt"
          iconSize={inputIconSize}
        />
        <TWButton
          uppercase
          i18n="screens.login.buttons.signIn"
          icon="sign-in"
          iconSize={inputIconSize}
          onPress={() => this.signIn()}
          style={{ marginTop: 20 }}
        />
      </View >
    );
  }

  renderMessage() {
    const { message, messageParam } = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <TWText
        multiline
        color={colors.white}
        style={{ padding: 5, backgroundColor: colors.secondary900 }}
        i18n={message}
        i18nParams={messageParam}
      />
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <TWText i18n="screens.login.form.codeLabel"/>
        <TWInput
          value={codeInput}
          containerStyle={{ marginTop: 15, marginBottom: 20 }}
          onChangeText={value => this.setState({ codeInput: value })}
          i18nPlaceholder="screens.login.form.codePlaceholder"
          type="number"
          icon="paw"
          iconSize={inputIconSize}
        />
        <TWButton
          uppercase
          i18n="screens.login.buttons.confirm"
          icon="paw"
          onPress={() => this.confirmCode()}
          style={{ marginTop: 20 }}
        />
      </View >
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <TWScreenWithNavigationBar i18nTitle="screens.login.title">
        {!user && !confirmResult ? this.renderPhoneNumberInput() : null}
        {this.renderMessage()}
        {!user && confirmResult ? this.renderVerificationCodeInput() : null}
        {user ? <View /> : null}
      </TWScreenWithNavigationBar >
    );
  }

  _checkUserByPhone = (
    phoneNumber: string,
    activeCB: () => mixed,
    inactiveCB: () => mixed
  ): void => {
    const isUserEnabled = (userData) => {
      const [key] = Object.keys(userData.val());
      const { enabled } = userData.val()[key];
      return enabled;
    }
    firebase.database()
      .ref('people')
      .orderByChild('phone')
      .limitToFirst(1)
      .equalTo(phoneNumber)
      .once('value', (snapshot) =>
        (snapshot.exists() && isUserEnabled(snapshot))
          ? activeCB()
          : inactiveCB()
      , () => {
      });
  }

  _resetState = (): void => {
    this.setState({
      user: null,
      message: '',
      messageParam: {},
      codeInput: '',
      phoneNumber: '+593',
      confirmResult: null,
    });
  }
}

export default LoginScreen;
