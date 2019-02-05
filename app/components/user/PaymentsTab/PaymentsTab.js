/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { cloneDeep } from 'lodash';
import firebase from 'react-native-firebase';
import InputForm from '../../_common/InputForm/InputForm';
import colors from '../../../styles/colors';
import TWText from '../../_common/TWText/TWText';
import TWTag from '../../_common/TWTag/TWTag';
import MoneyCauldron from './MoneyCauldron';
import TWButton from '../../_common/TWFormControls/TWButton';
import paymentStyles from './paymentStyles';
import appNavigation from '../../../navigation/Routes';
import TWModal from '../../_common/TWModal/TWModal';
import type { GlobalContext, payments, User } from '../../../context/types';
import withContext from '../../../context/WithContext';

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {
  isConfirmationPaymentVisible: boolean,
  isUndoPaymentVisible: boolean,
  paymentStatus: payments,
  labelColor: string,
  user: ?User,
};

const emptyPayment = {
  userId: '',
  amount: '',
  date: '',
  status: '',
};

class Payments extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isConfirmationPaymentVisible: false,
      isUndoPaymentVisible: false,
      paymentStatus: 'Pending',
      labelColor: colors.yellow800,
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    this.setState({ user });
  }

  hideModal() {
    this.setState({ isConfirmationPaymentVisible: false, isUndoPaymentVisible: false });
  }

  confirmPayment() {
    const payment = this.executePayment();

    firebase.database()
      .ref(`payments/idcualquiera/paymentsDone/${payment.userId}`)
      .set(payment, (error) => {
        if (error) {
          console.warn('The write failed...');
        } else {
          this.setState({
            isConfirmationPaymentVisible: false,
            paymentStatus: 'Paid',
            labelColor: colors.green500,
          });
        }
      });
  }

  executePayment() {
    const payment = cloneDeep(emptyPayment);
    const { user } = this.state;
    payment.userId = user.id;
    payment.amount = 30;
    payment.date = new Date();
    payment.status = 'Paid';
    return payment;
  }

  undoPayment() {
    this.setState(
      { isUndoPaymentVisible: false, paymentStatus: 'Pending', labelColor: colors.yellow800 },
    );
  }

  render() {
    const { navigation } = this.props;
    const {
      isUndoPaymentVisible, isConfirmationPaymentVisible, paymentStatus, labelColor,
    } = this.state;
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
                  color={labelColor}
                  label={paymentStatus}
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

              <View>
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
                  disabled={paymentStatus === 'Paid'}
                  iconSize={iconSize}
                  buttonColor={colors.green400}
                  onPress={() => this.setState({ isConfirmationPaymentVisible: true })}
                />

                <TWButton
                  i18n="screens.user.payments.form.undo"
                  icon="undo"
                  disabled={paymentStatus === 'Pending'}
                  iconSize={iconSize}
                  buttonColor={colors.secondary500}
                  style={buttonSpacing}
                  onPress={() => this.setState({ isUndoPaymentVisible: true })}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <TWModal
          i18nHeader="commons.confirmation"
          i18n="screens.user.payments.messages.confirmPayment"
          isVisible={isConfirmationPaymentVisible}
          onPressYes={() => this.confirmPayment()}
          onPressNo={() => this.hideModal()}
        />

        <TWModal
          i18nHeader="commons.confirmation"
          i18n="screens.user.payments.messages.undoPayment"
          isVisible={isUndoPaymentVisible}
          onPressYes={() => this.undoPayment()}
          onPressNo={() => this.hideModal()}
        />
      </View>
    );
  }
}

export default withContext(Payments);
