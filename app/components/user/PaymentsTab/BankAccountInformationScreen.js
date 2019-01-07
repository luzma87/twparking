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
            field="asas"
            i18nLabel="screens.user.payments.bank.account"
            i18nPlaceholder="screens.user.payments.bank.account"
          />
        </View>

        <TWButton
          i18n="screens.user.payments.form.bankAccount"
          buttonColor={colors.primary700}
          onPress={() => navigation.navigate(appNavigation.navigationTree.UserHome)}
          style={{ marginVertical: 40 }}
        />
      </View>
    );
  }
}

export default BankAccountInformationScreen;
