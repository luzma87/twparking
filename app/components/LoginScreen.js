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

type Props = {
  navigation: Object
};
type State = {
  user: Object,
  message: string,
  messageParam: Object,
  codeInput: string,
  phoneNumber: string,
  confirmResult: Object
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
        this.setState({ user: user.toJSON() }, () => {
          // redirect here
          const { navigation } = this.props;
          navigation.navigate(appNavigation.navigationTree.UserHome);
        });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          messageParam: {},
          codeInput: '',
          phoneNumber: '+593',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  signIn = () => {
    const { phoneNumber } = this.state;

    firebase.database()
      .ref('people')
      .orderByChild('phone')
      .equalTo(phoneNumber)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.signInWithPhoneNumber(phoneNumber);
        } else {
          this.setState({ message: 'screens.login.errors.notAllowed', messageParam: {} });
        }
      });
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

  signInWithPhoneNumber(phoneNumber) {
    this.setState({ message: 'screens.login.codeSending', messageParam: {} });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'screens.login.codeSent', messageParam: {} }))
      .catch(
        error => this.setState(
          { message: 'screens.login.errors.signIn', messageParam: { message: error.message } },
        ),
      );
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <TWText i18n="screens.login.form.phoneLabel" />
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
      </View>
    );
  }

  renderMessage() {
    const { message, messageParam } = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <TWText
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
        <TWText i18n="screens.login.form.codeLabel" />
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
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary100 }}>
        <TWHeader i18n="screens.login.title" onPress={null} />
        {!user && !confirmResult ? this.renderPhoneNumberInput() : null}

        {this.renderMessage()}

        {!user && confirmResult ? this.renderVerificationCodeInput() : null}

        {user ? <View /> : null}
      </View>
    );
  }
}

export default LoginScreen;
