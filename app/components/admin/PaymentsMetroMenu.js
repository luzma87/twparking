/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import withContext from '../../context/WithContext';
import TWMetroButton from '../_common/TWFormControls/TWMetroButton';
import type { GlobalContext } from '../../context/types';

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {};

class PaymentsMetroMenu extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  render() {
    /*
    Balance --> quien pago este mes
    asignacion puesto para usuario
    generar cuota para este mes
    registro pago a owners
     */
    return (
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
          marginBottom: 16,
        }}
        >
          <TWMetroButton
            i18n="screens.admin.home.logistics.MonthlyPayments"
            onPress={() => {}}
            icon="cauldron"
            tint="green"
            widthRatio={3}
          />
          <TWMetroButton
            i18n="screens.admin.home.logistics.Balance"
            onPress={() => {}}
            icon="abacus"
            tint="blue"
          />
          <TWMetroButton
            i18n="screens.admin.home.logistics.Assignments"
            onPress={() => {}}
            icon="wand-magic"
            tint="deepPurple"
            tintBase={300}
            widthRatio={2}
          />
          <TWMetroButton
            i18n="screens.admin.home.logistics.OwnerPayments"
            onPress={() => {}}
            icon="money-bill-wave"
            tint="secondary"
            tintBase={300}
            widthRatio={3}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withContext(PaymentsMetroMenu);
