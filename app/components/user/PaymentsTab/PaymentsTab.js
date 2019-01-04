/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { scale } from 'react-native-size-matters';
import InputForm from '../../_common/InputForm/InputForm';
import colors from '../../../styles/colors';
import TWText from '../../_common/TWText/TWText';
import TWTag from '../../_common/TWTag/TWTag';
import MoneyCauldron from './MoneyCauldron';

type Props = {};
type State = {};

class Payments extends Component<Props, State> {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={{
            paddingTop: 10,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: '8%',
          }}
          >
            <MoneyCauldron size={120} />
            <View style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginLeft: scale(15),
              paddingLeft: 10,
              flex: 1,
            }}
            >
              <TWText weight="bold" text="$33.50" size="big" color={colors.green800} />
              <TWTag />
            </View>
          </View>

          <View style={{ paddingLeft: '8%', paddingRight: '12%' }}>
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
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Payments;
