/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'react-native-firebase';
import RNPickerSelect from 'react-native-picker-select';
import type { Owner, ParkingSpot } from '../../../../context/types';
import I18n from '../../../../i18n';
import colors from '../../../../styles/colors';
import InputForm from '../../../_common/InputForm/InputForm';
import SizePicker from '../../../_common/InputForm/SizePicker';
import TWLabel from '../../../_common/InputForm/TWLabel';
import TWButton from '../../../_common/TWFormControls/TWButton';
import TWText from '../../../_common/TWText/TWText';
import pickerSelectStyles from '../../_common/PickerStyles';

type Props = {
  owner: ?Owner,
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
        size: 'M',
        cost: 0,
        active: true,
        free: true,
      },
    };
  }

  saveParking() {
    const { owner } = this.props;
    if (owner && owner.id) {
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
  }

  mergeParking(newData: Object) {
    const { parking } = this.state;
    const newParking = { ...parking, ...newData };
    this.setState({ parking: newParking });
  }

  render() {
    const { owner } = this.props;
    const { parking } = this.state;
    const rawSizes = I18n.t('commons.size');
    const sizes = [];
    Object.keys(rawSizes).forEach((sizeKey) => {
      const rawSize = rawSizes[sizeKey];
      const size = {
        label: rawSize,
        value: sizeKey,
      };
      sizes.push(size);
    });
    if (!owner) {
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
            <SizePicker
              value={parking.size}
              onValueChange={value => this.mergeParking({ size: value })}
            />
            <InputForm
              field={parking.cost}
              i18nLabel="screens.admin.parking.create.form.cost"
              i18nPlaceholder="screens.admin.parking.create.form.costPlaceholder"
              inputProps={{ autoFocus: true }}
              onChangeText={value => this.mergeParking({ cost: value })}
            />
            <InputForm
              field={parking.comments || ''}
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
