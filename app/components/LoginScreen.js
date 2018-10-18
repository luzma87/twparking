/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import firebase from 'react-native-firebase';
import appNavigation from '../navigation/Routes';
import { colors } from '../styles/colors';
import TWHeader from './_common/TWHeader/TWHeader';
import navigationHeader from '../navigation/NavigationStylesHelper';
import TWText from './_common/TWText/TWText';

type Props = {
  navigation: Object
};
type State = {};

const inputIconSize = 16;

class LoginScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
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
          navigation.navigate(appNavigation.navigationTree.Home);
        });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
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
          this.setState({ message: 'Login not allowed' });
        }
      });
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  signInWithPhoneNumber(phoneNumber) {
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(
        error => this.setState(
          { message: `Sign In With Phone Number Error: ${error.message}` },
        ),
      );
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <TWText text="Enter phone number:" />
        <Input
          autoFocus
          containerStyle={{ marginTop: 15, marginBottom: 20 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder="Phone number ... "
          value={phoneNumber}
          keyboardType="number-pad"
          leftIcon={(
            <FontAwesome5Pro
              size={inputIconSize}
              color={colors.primary300}
              name="mobile-android-alt"
            />
          )}
        />
        <Button
          icon={(
            <FontAwesome5Pro
              size={inputIconSize}
              name="sign-in"
              color="white"
            />
          )}
          iconRight
          title="SIGN IN"
          onPress={this.signIn}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <TWText
        color={colors.white}
        style={{ padding: 5, backgroundColor: colors.secondary900 }}
        text={message}
      />
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <TWText text="Enter verification code below:" />
        <Input
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder="Code ... "
          keyboardType="number-pad"
          leftIcon={(
            <FontAwesome5Pro
              solid
              size={inputIconSize}
              color={colors.primary300}
              name="paw"
            />
          )}
          value={codeInput}
        />
        <Button
          icon={(
            <FontAwesome5Pro
              solid
              size={inputIconSize}
              name="paw"
              color="white"
            />
          )}
          title="Confirm Code"
          onPress={this.confirmCode}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary100 }}>
        <TWHeader title="TW Parking - Login" onPress={null} />
        {!user && !confirmResult ? this.renderPhoneNumberInput() : null}

        {this.renderMessage()}

        {!user && confirmResult ? this.renderVerificationCodeInput() : null}

        {user ? <View /> : null}
      </View>
    );
  }
}

export default LoginScreen;
