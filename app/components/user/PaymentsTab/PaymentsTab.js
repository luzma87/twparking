/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { scale } from 'react-native-size-matters';
import InputForm from '../../_common/InputForm/InputForm';
import colors from '../../../styles/colors';
import TWText from '../../_common/TWText/TWText';
import TWTag from '../../_common/TWTag/TWTag';

type Props = {};
type State = {};

class Payments extends Component<Props, State> {
  render() {
    return (
      <ScrollView style={{
        paddingLeft: '8%',
        paddingRight: '10%',
      }}
      >

        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
          <FontAwesome5Pro
            solid
            inverted
            size={130}
            name="money-bill-wave"
            color={colors.green800}
          />
          <View style={{
            flexDirection: 'column',
            marginLeft: scale(15),
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          >
            <TWText weight="bold" text="$33.50" size="big" color={colors.green800} />
            <TWTag />
          </View>
        </View>

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
      </ScrollView>
    );
  }
}

export default Payments;
