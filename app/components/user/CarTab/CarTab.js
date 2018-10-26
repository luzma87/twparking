/* @flow */
import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import _ from 'lodash';
import InputForm from '../../_common/InputForm/InputForm';
import Plate from './Plate';
import TWText from '../../_common/TWText/TWText';

type Props = {};
type State = {
  plate: string,
  brand: string,
  model: string,
  year: string,
};

const carSampleOne = require('./images/car_sample_1.png');
const carSampleTwo = require('./images/car_sample_2.png');
const carSampleThree = require('./images/car_sample_3.png');
const carSampleFour = require('./images/car_sample_4.png');
const carSampleFive = require('./images/car_sample_5.png');

const vehicles = [carSampleOne, carSampleTwo, carSampleThree, carSampleFour, carSampleFive];

class CarTab extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plate: '',
      brand: '',
      model: '',
      year: '',
    };
  }

  render() {
    const {
      plate, brand, model, year,
    } = this.state;
    return (
      <ScrollView
        style={{
          paddingHorizontal: '10%',
        }}
      >

        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 130, marginTop: 40 }}>
            <Image source={_.sample(vehicles)} />
          </View>

          <Plate plate={plate} />

          <InputForm
            field={plate}
            i18nLabel="screens.user.cars.form.plate"
            i18nPlaceholder="screens.user.cars.form.platePlaceholder"
            onChangeText={value => this.setState({ plate: value })}
          />

          <InputForm
            field={brand}
            i18nLabel="screens.user.cars.form.brand"
            i18nPlaceholder="screens.user.cars.form.brandPlaceholder"
            onChangeText={value => this.setState({ brand: value })}
          />

          <InputForm
            field={model}
            i18nLabel="screens.user.cars.form.model"
            i18nPlaceholder="screens.user.cars.form.modelPlaceholder"
            onChangeText={value => this.setState({ model: value })}
          />

          <InputForm
            field={year}
            i18nLabel="screens.user.cars.form.year"
            i18nPlaceholder="screens.user.cars.form.yearPlaceholder"
            onChangeText={value => this.setState({ year: value })}
          />

          <TWText weight="light" font="reenieBeanie" text="Pico y placa el dia Martes" size="title" style={{ marginVertical: 40 }} />
        </View>

      </ScrollView>
    );
  }
}

export default CarTab;
