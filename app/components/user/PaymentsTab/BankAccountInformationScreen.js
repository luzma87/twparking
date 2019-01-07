/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import TWText from '../../_common/TWText/TWText';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import appNavigation from '../../../navigation/Routes';
import IPhoneXTopSeparator from '../../_common/Separators/IPhoneXTopSeparator';
import TWHeader from '../../_common/TWHeader/TWHeader';
import InputForm from '../../_common/InputForm/InputForm';
import TWClose from '../../_common/TWClose/TWClose';
import styles from '../CarTab/carStyles';
import colors from '../../../styles/colors';

type Props = {
  navigation: Object,
};
type State = {};

const bankLogo = require('./images/bank_logo.png');

class BankAccountInformationScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  goBack() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    return (
      <View>
        <IPhoneXTopSeparator />
        <TWHeader
          i18n="screens.user.payments.form.bankAccount"
          onPress={null}
        />
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
                field="Pichincha"
                i18nLabel="screens.user.payments.bank.bank"
                i18nPlaceholder="screens.user.payments.bank.bank"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field="2200123123"
                i18nLabel="screens.user.payments.bank.account"
                i18nPlaceholder="screens.user.payments.bank.account"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field="Savings"
                i18nLabel="screens.user.payments.bank.type"
                i18nPlaceholder="screens.user.payments.bank.type"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field="17132671811"
                i18nLabel="screens.user.payments.bank.id"
                i18nPlaceholder="screens.user.payments.bank.id"
              />

              <InputForm
                inputProps={{ editable: false }}
                uppercase
                labelPadding={70}
                field="Luzma"
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
      </View>
    );
  }
}

export default BankAccountInformationScreen;
