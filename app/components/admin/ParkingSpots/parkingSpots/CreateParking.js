/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'react-native-firebase';
import type { Owner, ParkingSpot } from '../../../../context/types';
import InputForm from '../../../_common/InputForm/InputForm';
import TWButton from '../../../_common/TWFormControls/TWButton';
import TWText from '../../../_common/TWText/TWText';

type Props = {
  owner: Owner,
  onSaveDone: () => void
};
type State = {
  parking: ParkingSpot
};

class CreateParking extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      parking: {
        building: '',
        number: '',
        address: '',
        size: 'S',
        cost: 0,
        active: true,
      },
    };
  }

  saveParking() {
    const { owner } = this.props;
    const { parking } = this.state;
    const { onSaveDone } = this.props;
    const ownerKey = owner.id;
    if (!owner.parkingSpots) {
      owner.parkingSpots = [];
    }
    owner.parkingSpots.push(parking);
    firebase.database().ref(`owners/${ownerKey}`).set(owner, (error) => {
      if (error) {
        console.warn('The write failed...');
      } else {
        onSaveDone();
      }
    });
  }

  mergeParking(newData: Object) {
    const { parking } = this.state;
    const newParking = { ...parking, ...newData };
    this.setState({ parking: newParking });
  }

  render() {
    const { owner } = this.props;
    const { parking } = this.state;
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
          i18n="screens.admin.parking.create.header"
          i18nParams={{ owner: owner.name }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <InputForm
              field={parking.building}
              i18nLabel="screens.admin.parking.create.form.building"
              i18nPlaceholder="screens.admin.parking.create.form.buildingPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ building: value })}
            />
            <InputForm
              field={parking.number}
              i18nLabel="screens.admin.parking.create.form.number"
              i18nPlaceholder="screens.admin.parking.create.form.numberPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ number: value })}
            />
            <InputForm
              field={parking.address}
              i18nLabel="screens.admin.parking.create.form.address"
              i18nPlaceholder="screens.admin.parking.create.form.addressPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ address: value })}
            />
            <InputForm
              field={parking.size}
              i18nLabel="screens.admin.parking.create.form.size"
              i18nPlaceholder="screens.admin.parking.create.form.sizePlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ size: value })}
            />
            <InputForm
              field={parking.cost}
              i18nLabel="screens.admin.parking.create.form.cost"
              i18nPlaceholder="screens.admin.parking.create.form.costPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ cost: value })}
            />
            <InputForm
              field={parking.comments}
              i18nLabel="screens.admin.parking.create.form.comments"
              i18nPlaceholder="screens.admin.parking.create.form.commentsPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ comments: value })}
            />
            <TWButton i18n="commons.buttons.save" onPress={() => this.saveParking()} style={{ marginTop: 30 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CreateParking;
