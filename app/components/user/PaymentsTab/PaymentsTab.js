/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import InputForm from '../../_common/InputForm/InputForm';
import colors from '../../../styles/colors';
import TWText from '../../_common/TWText/TWText';
import TWTag from '../../_common/TWTag/TWTag';
import MoneyCauldron from './MoneyCauldron';
import TWButton from '../../_common/TWFormControls/TWButton';
import paymentStyles from './paymentStyles';
import appNavigation from '../../../navigation/Routes';
import TWModal from '../../_common/TWModal/TWModal';

type Props = {
  navigation: Object,
};
type State = {
  isVisible: boolean,
};

class Payments extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const { isVisible } = this.state;
    const buttonSpacing = { paddingVertical: 15 };
    const iconSize = 23;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <View style={paymentStyles.header}>
              <MoneyCauldron size={scale(130)} />
              <View style={paymentStyles.headerTag}>
                <TWText
                  weight="bold"
                  text="$33.50"
                  size="big"
                  color={colors.green800}
                />
                <TWTag
                  color={colors.yellow800}
                  label="Pending"
                  fontColor="white"
                />
              </View>
            </View>

            <View style={paymentStyles.form}>
              <InputForm
                field={2018}
                inputProps={{ editable: false }}
                i18nLabel="screens.user.payments.form.year"
                i18nPlaceholder="screens.user.payments.form.yearPlaceholder"
              />

              <InputForm
                field="October"
                inputProps={{ editable: false }}
                i18nLabel="screens.user.payments.form.month"
                i18nPlaceholder="screens.user.payments.form.monthPlaceholder"
              />

              <View className="buttonsContainer">
                <TWButton
                  i18n="screens.user.payments.form.bankAccount"
                  icon="piggy-bank"
                  iconSize={iconSize}
                  style={buttonSpacing}
                  buttonColor={colors.yellow800}
                  onPress={() => {
                    navigation.navigate(appNavigation.navigationTree.BankInformation);
                  }}
                />

                <TWButton
                  i18n="screens.user.payments.form.payment"
                  icon="usd-circle"
                  style={buttonSpacing}
                  iconSize={iconSize}
                  buttonColor={colors.green400}
                  onPress={() => {
                    this.setState({ isVisible: true });
                  }}
                />

                <TWButton
                  i18n="screens.user.payments.form.undo"
                  icon="undo"
                  iconSize={iconSize}
                  buttonColor={colors.secondary500}
                  style={buttonSpacing}
                  onPress={() => {
                  }}
                  disabledC="white"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <TWModal isVisible={isVisible} />
      </View>
    );
  }
}

export default Payments;
