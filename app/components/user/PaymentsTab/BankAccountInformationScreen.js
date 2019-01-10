/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import firebase from 'react-native-firebase';
// noinspection ES6CheckImport
import { isEmpty } from 'lodash';
import TWText from '../../_common/TWText/TWText';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import appNavigation from '../../../navigation/Routes';
import InputForm from '../../_common/InputForm/InputForm';
import TWClose from '../../_common/TWClose/TWClose';
import colors from '../../../styles/colors';
import type { Account } from '../../../context/types';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';

type Props = {
  navigation: Object,
};
type State = {
  account: Account
};

const bankLogo = require('./images/bank_logo.png');

class BankAccountInformationScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props) {
    super(props);
    this.state = {
      account: {},
    };
    this.getBankAccount();
  }

  getBankAccount() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('account')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const { account } = this.state;
            if (isEmpty(account)) {
              this.setState({ account: snapshot.val() });
            }
          }
        }, () => {
        });
    });
  }

  goBack() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    const { account } = this.state;
    return (
      <TWScreenWithNavigationBar i18nTitle="screens.user.payments.form.bankAccount">
        <ScrollView>
          <View>

            <TWClose onPress={() => this.goBack()} />

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
              }}
            >
              <Avatar
                size="xlarge"
                source={bankLogo}
                imageProps={{
                  resizeMode: 'contain',
                }}
              />
              <TWText i18n="screens.user.payments.form.bankAccountInformation" weight="bold" />
            </View>

            <View style={{ paddingHorizontal: '8%', marginTop: 25 }}>
              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field={account.bank}
                i18nLabel="screens.user.payments.bank.bank"
                i18nPlaceholder="screens.user.payments.bank.bank"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field={account.account}
                i18nLabel="screens.user.payments.bank.account"
                i18nPlaceholder="screens.user.payments.bank.account"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field={account.type}
                i18nLabel="screens.user.payments.bank.type"
                i18nPlaceholder="screens.user.payments.bank.type"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field={account.id}
                i18nLabel="screens.user.payments.bank.id"
                i18nPlaceholder="screens.user.payments.bank.id"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field={account.beneficiary}
                i18nLabel="screens.user.payments.bank.beneficiary"
                i18nPlaceholder="screens.user.payments.bank.beneficiary"
              />

              <View style={{ flexDirection: 'row', paddingHorizontal: '8%', marginTop: 10 }}>
                <FontAwesome5Pro
                  solid
                  inverted
                  size={20}
                  name="engine-warning"
                  color={colors.secondary500}
                />
                <TWText multiline weight="regular" i18n="screens.user.payments.bank.changePayment" size="regular" style={{ marginLeft: 10 }} />
              </View>
            </View>
          </View>
        </ScrollView>
      </TWScreenWithNavigationBar>
    );
  }
}

export default BankAccountInformationScreen;
