/* @flow */
import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
// noinspection ES6CheckImport
import { sample } from 'lodash';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import withContext from '../../../context/WithContext';
import InputForm from '../../_common/InputForm/InputForm';
import Plate from './Plate';
import TWText from '../../_common/TWText/TWText';
import type { Car, GlobalContext } from '../../../context/types';
import carHelper from '../../../util/carHelper';
import styles from './carStyles';
import colors from '../../../styles/colors';

type Props = {
  context: GlobalContext,
};
type State = {
  car: Car,
};

const carSampleOne = require('./images/car_sample_1.png');
const carSampleTwo = require('./images/car_sample_2.png');
const carSampleThree = require('./images/car_sample_3.png');
const carSampleFour = require('./images/car_sample_4.png');
const carSampleFive = require('./images/car_sample_5.png');

const vehicles = [carSampleOne, carSampleTwo, carSampleThree, carSampleFour, carSampleFive];

class CarTab extends Component<Props, State> {
  componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    const { car } = user;
    car.vehicle = sample(vehicles);
    this.setState({ car });
  }

  render() {
    const { car } = this.state;
    return (
      <ScrollView
        style={styles.scrollContainer}
      >

        <View style={{ alignItems: 'center' }}>
          <View style={styles.carImage}>
            <Image source={car.vehicle} />
          </View>

          <Plate plate={car.plate} />

          <InputForm
            inputProps={{ editable: false }}
            uppercase
            field={car.plate}
            i18nLabel="screens.user.cars.form.plate"
            i18nPlaceholder="screens.user.cars.form.platePlaceholder"
            onChangeText={(value) => {
              this.setState({ car: { ...car, plate: value } });
            }}
          />

          <InputForm
            field={car.brand}
            inputProps={{ editable: false }}
            i18nLabel="screens.user.cars.form.brand"
            i18nPlaceholder="screens.user.cars.form.brandPlaceholder"
            onChangeText={(value) => {
              this.setState({ car: { ...car, brand: value } });
            }}
          />

          <InputForm
            field={car.model}
            inputProps={{ editable: false }}
            i18nLabel="screens.user.cars.form.model"
            i18nPlaceholder="screens.user.cars.form.modelPlaceholder"
            onChangeText={(value) => {
              this.setState({ car: { ...car, model: value } });
            }}
          />

          <InputForm
            field={car.size}
            inputProps={{ editable: false }}
            i18nLabel="screens.user.cars.form.size"
            i18nPlaceholder="screens.user.cars.form.sizePlaceholder"
            onChangeText={(value) => {
              this.setState({ car: { ...car, size: value } });
            }}
          />

          <View style={styles.warningMessage}>
            <FontAwesome5Pro
              solid
              inverted
              size={20}
              name="engine-warning"
              color={colors.secondary500}
            />
            <TWText weight="regular" i18n={`screens.user.cars.restriction.${carHelper.dayForTrafficRestriction(car.plate)}`} size="regular" style={{ marginLeft: 10 }} />
          </View>
        </View>

      </ScrollView>
    );
  }
}

export default withContext(CarTab);
