/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import TWText from '../../_common/TWText/TWText';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import TWButton from '../../_common/TWFormControls/TWButton';
import colors from '../../../styles/colors';
import appNavigation from '../../../navigation/Routes';
import IPhoneXTopSeparator from '../../_common/Separators/IPhoneXTopSeparator';
import TWHeader from '../../_common/TWHeader/TWHeader';
import InputForm from '../../_common/InputForm/InputForm';

type Props = {
  navigation: Object,
};
type State = {};

const bankLogo = require('./images/bank_logo.png');

class BankAccountInformationScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <IPhoneXTopSeparator />
        <TWHeader
          i18n="screens.user.payments.form.bankAccount"
          onPress={null}
        />

        <View style={{ alignItems: 'center' }}>
          <Avatar
            size="xlarge"
            source={bankLogo}
            imageProps={{
              resizeMode: 'contain',
            }}
          />
          <TWText i18n="screens.user.payments.form.bankAccountInformation" />
        </View>

        <View style={{ paddingHorizontal: '8%' }}>
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

          <TWButton
            i18n="screens.user.payments.form.bankAccount"
            buttonColor={colors.primary700}
            onPress={() => navigation.navigate(appNavigation.navigationTree.UserHome)}
            style={{ marginVertical: 40 }}
          />
        </View>
      </View>
    );
  }
}

export default BankAccountInformationScreen;
