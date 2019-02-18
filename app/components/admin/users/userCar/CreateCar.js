/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'react-native-firebase';
import type { User, Car } from '../../../../context/types';
import ColorPicker from '../../../_common/InputForm/ColorPicker';
import InputForm from '../../../_common/InputForm/InputForm';
import SizePicker from '../../../_common/InputForm/SizePicker';
import TWButton from '../../../_common/TWFormControls/TWButton';
import TWText from '../../../_common/TWText/TWText';

type Props = {
  person: ?User,
  onSaveDone: () => void
};
type State = {
  car: Car
};

const emptyCar = {
  brand: '',
  model: '',
  plate: '',
  size: '',
  color: '',
};

class CreateCar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const car = props.person && props.person.car
      ? props.person.car
      : emptyCar;
    this.state = {
      car,
    };
  }

  save() {
    const { person } = this.props;
    if (person) {
      const { car } = this.state;
      const { onSaveDone } = this.props;
      const personKey = person.id;
      person.car = car;
      firebase.database().ref(`people/${personKey}`).set(person, (error) => {
        if (error) {
          console.warn('The write failed...');
        } else {
          onSaveDone();
        }
      });
    }
  }

  merge(newData: Object) {
    const { car } = this.state;
    const newCar = { ...car, ...newData };
    this.setState({ car: newCar });
  }

  render() {
    const { person } = this.props;
    const { car } = this.state;
    if (!person) {
      return null;
    }
    return (
      <View style={{
        flex: 1, paddingTop: '10%', paddingLeft: '10%', paddingRight: '10%',
      }}
      >
        <TWText
          font="vt323"
          size="title"
          multiline
          align="center"
          i18n="screens.admin.cars.create.header"
          i18nParams={{ person: person.name }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <InputForm
              field={car.brand}
              i18nLabel="screens.admin.cars.create.form.brand"
              i18nPlaceholder="screens.admin.cars.create.form.brandPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.merge({ brand: value })}
            />
            <InputForm
              field={car.model}
              i18nLabel="screens.admin.cars.create.form.model"
              i18nPlaceholder="screens.admin.cars.create.form.modelPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.merge({ model: value })}
            />
            <ColorPicker value={car.color || "black"} onValueChange={value => this.merge({ color: value })} />
            <SizePicker value={car.size || ""} onValueChange={value => this.merge({ size: value })} />
            <InputForm
              field={car.plate}
              i18nLabel="screens.admin.cars.create.form.plate"
              i18nPlaceholder="screens.admin.cars.create.form.platePlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.merge({ plate: value })}
            />
            <TWButton i18n="commons.buttons.save" onPress={() => this.save()} style={{ marginTop: 30 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CreateCar;
