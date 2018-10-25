/* @flow */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import TWText from '../../_common/TWText/TWText';

type Props = {};
type State = {};

const carSampleOne = require('./images/car_sample_1.png');
const carSampleTwo = require('./images/car_sample_2.png');
const carSampleThree = require('./images/car_sample_3.png');
const carSampleFour = require('./images/car_sample_4.png');
const carSampleFive = require('./images/car_sample_5.png');

class CarTab extends Component<Props, State> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ backgroundColor: 'blue' }}>
          <Image source={carSampleOne} />
        </View>

        <View >
          <TWText i18n="screens.cars.plate" />
        </View>
      </View>
    );
  }
}

export default CarTab;
