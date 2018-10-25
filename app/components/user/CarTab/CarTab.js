/* @flow */
import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import _ from 'lodash';
import InputForm from '../../_common/InputForm/InputForm';
import Plate from './Plate';

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
          <View style={{ marginTop: 40 }}>
            <Image source={_.sample(vehicles)} />
          </View>

          <InputForm
            field={plate}
            i18nLabel="screens.cars.form.plate"
            i18nPlaceholder="screens.cars.form.platePlaceholder"
            onChangeText={value => this.setState({ plate: value })}
          />

          <InputForm
            field={brand}
            i18nLabel="screens.cars.form.brand"
            i18nPlaceholder="screens.cars.form.brandPlaceholder"
            onChangeText={value => this.setState({ brand: value })}
          />

          <InputForm
            field={model}
            i18nLabel="screens.cars.form.model"
            i18nPlaceholder="screens.cars.form.modelPlaceholder"
            onChangeText={value => this.setState({ model: value })}
          />

          <InputForm
            field={year}
            i18nLabel="screens.cars.form.year"
            i18nPlaceholder="screens.cars.form.yearPlaceholder"
            onChangeText={value => this.setState({ year: value })}
          />

          <Plate plate={plate} />
        </View>

      </ScrollView>
    );
  }
}

export default CarTab;
