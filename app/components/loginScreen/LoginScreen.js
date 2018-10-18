/* @flow */
import React, {Component} from 'react';
import {
  Text, TextInput, View,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

import firebase from 'react-native-firebase';
import appNavigation from '../../navigation/Routes';
import {colors} from "../../styles/colors";
import TWHeader from "../_common/TWHeader/TWHeader";
import navigationHeader from "../../navigation/NavigationStylesHelper";

type Props = {
  navigation: Object
};
type State = {};

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
        this.setState({user: user.toJSON()}, () => {
          // redirect here
          const {navigation} = this.props;
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
    const {phoneNumber} = this.state;

    firebase.database()
      .ref('people')
      .orderByChild('phone')
      .equalTo(phoneNumber)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.signInWithPhoneNumber(phoneNumber);
        } else {
          this.setState({message: 'Login not allowed'});
        }
      });
  };

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({message: 'Code Confirmed!'});
        })
        .catch(error => this.setState({message: `Code Confirm Error: ${error.message}`}));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  signInWithPhoneNumber(phoneNumber) {
    this.setState({message: 'Sending code ...'});

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({confirmResult, message: 'Code has been sent!'}))
      .catch(
        error => this.setState(
          {message: `Sign In With Phone Number Error: ${error.message}`},
        ),
      );
  }

  renderPhoneNumberInput() {
    const iconSize = 16;
    const {phoneNumber} = this.state;

    return (
      <View style={{padding: 25}}>
        <Text>Enter phone number:</Text>
        <Input
          autoFocus
          containerStyle={{marginTop: 15, marginBottom: 20}}
          onChangeText={value => this.setState({phoneNumber: value})}
          placeholder="Phone number ... "
          value={phoneNumber}
          keyboardType="number-pad"
          leftIcon={(
            <FontAwesome5Pro
              size={iconSize}
              color={colors.primary300}
              name="mobile-android-alt"
            />
          )}
        />
        <Button
          icon={(
            <FontAwesome5Pro
              size={iconSize}
              name="sign-in"
              color="white"
            />
          )}
          iconRight
          title="Sign In"
          onPress={this.signIn}
          style={{marginTop: 20}}
        />
      </View>
    );
  }

  renderMessage() {
    const {message} = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <Text style={{padding: 5, backgroundColor: colors.secondary900, color: colors.white}}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const {codeInput} = this.state;

    return (
      <View style={{marginTop: 25, padding: 25}}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{height: 40, marginTop: 15, marginBottom: 15}}
          onChangeText={value => this.setState({codeInput: value})}
          placeholder="Code ... "
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          onPress={this.confirmCode}
          style={{marginTop: 20}}
        />
      </View>
    );
  }

  render() {
    const {user, confirmResult} = this.state;
    return (
      <View style={{flex: 1}}>
        <TWHeader title="TW Parking - Login" onPress={null}/>
        {!user && !confirmResult ? this.renderPhoneNumberInput() : null}

        {this.renderMessage()}

        {!user && confirmResult ? this.renderVerificationCodeInput() : null}

        {user ? <View/> : null}
      </View>
    );
  }
}

export default LoginScreen;
