/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { cloneDeep, isEmpty } from 'lodash';
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
import paymentUtil from '../../../util/paymentUtil';
import I18n from '../../../i18n';
import TWMetroButton from '../../_common/TWFormControls/TWMetroButton';

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
      fee: {},
      paymentKey: paymentUtil.getCurrentDateForFee(),
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    this.setState({ user });
    this.getMonthlyFee();
    this.getPaymentState();
  }

  getMonthlyFee() {
    const { paymentKey } = this.state;
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref(`payments/${paymentKey}/fee`)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const { fee } = this.state;
            if (isEmpty(fee)) {
              this.setState({ fee: snapshot.val() });
            }
          }
        }, () => {
        });
    });
  }

  getPaymentState() {
    const { context } = this.props;
    const { paymentKey } = this.state;
    const { user } = context;
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref(`payments/${paymentKey}/paymentsDone/${user.id}`)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            this.setState({ paymentStatus: snapshot.val().status });
          }
        }, () => {
        });
    });
  }

  getConfirmationPaymentModal() {
    return this.setState({ isConfirmationPaymentVisible: true });
  }

  hideModal() {
    this.setState({ isConfirmationPaymentVisible: false, isUndoPaymentVisible: false });
  }

  doPayment(payment) {
    const { paymentKey } = this.state;

    firebase.database()
      .ref(`payments/${paymentKey}/paymentsDone/${payment.userId}`)
      .set(payment, (error) => {
        if (error) {
          console.warn('The write failed...');
        } else {
          this.setState({
            isConfirmationPaymentVisible: false,
            isUndoPaymentVisible: false,
            paymentStatus: payment.status,
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

  cancelPayment() {
    const payment = cloneDeep(emptyPayment);
    const { user } = this.state;
    payment.userId = user.id;
    payment.amount = 0;
    payment.date = new Date();
    payment.status = 'Pending';
    return payment;
  }

  render() {
    const { navigation } = this.props;
    const { fee } = this.state;
    const {
      isUndoPaymentVisible, isConfirmationPaymentVisible, paymentStatus,
    } = this.state;
    const buttonSpacing = { marginBottom: 15, paddingHorizontal: '3%' };
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 50 }}>
            <View style={paymentStyles.header}>
              <MoneyCauldron size={scale(130)} />
              <View style={paymentStyles.headerTag}>
                <TWText
                  weight="bold"
                  text={paymentUtil.getMoneyExpression(fee.amount)}
                  size="big"
                  color={colors.green800}
                />
                <TWTag
                  color={paymentStatus === 'Paid' ? colors.green500 : colors.yellow800}
                  label={paymentStatus}
                  fontColor="white"
                />
              </View>
            </View>
            <View style={paymentStyles.form}>
              <InputForm
                field={fee.year}
                inputProps={{ editable: false }}
                i18nLabel="screens.user.payments.form.year"
                i18nPlaceholder="screens.user.payments.form.yearPlaceholder"
              />

              <InputForm
                field={I18n.t(paymentUtil.getMonthName(fee.month))}
                inputProps={{ editable: false }}
                i18nLabel="screens.user.payments.form.month"
                i18nPlaceholder="screens.user.payments.form.monthPlaceholder"
              />


            </View>
          </View>

          <View style={buttonSpacing}>
            <TWMetroButton
              i18n="screens.user.payments.form.bankAccount"
              onPress={() => {
                navigation.navigate(appNavigation.navigationTree.BankInformation);
              }}
              icon="piggy-bank"
              widthRatio={3}
              tint="yellow"
              tintBase={800}
            />

            <TWMetroButton
              i18n="screens.user.payments.form.payment"
              onPress={() => this.getConfirmationPaymentModal()}
              icon="usd-circle"
              disabled={paymentStatus === 'Paid'}
              widthRatio={3}
              tint="green"
            />

            <TWMetroButton
              i18n="screens.user.payments.form.undo"
              onPress={() => this.setState({ isUndoPaymentVisible: true })}
              icon="undo"
              disabled={paymentStatus === 'Pending'}
              widthRatio={3}
              tint="secondary"
            />
          </View>

        </ScrollView>

        <TWModal
          i18nHeader="commons.confirmation"
          i18n="screens.user.payments.messages.confirmPayment"
          isVisible={isConfirmationPaymentVisible}
          onPressYes={() => this.doPayment(this.executePayment())}
          onPressNo={() => this.hideModal()}
        />

        <TWModal
          i18nHeader="commons.confirmation"
          i18n="screens.user.payments.messages.undoPayment"
          isVisible={isUndoPaymentVisible}
          onPressYes={() => this.doPayment(this.cancelPayment())}
          onPressNo={() => this.hideModal()}
        />
      </View>
    );
  }
}

export default withContext(Payments);
