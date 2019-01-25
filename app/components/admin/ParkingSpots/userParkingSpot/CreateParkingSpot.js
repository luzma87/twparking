/* @flow */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'react-native-firebase';
import I18n from '../../../../i18n';
import colors from '../../../../styles/colors';
import TWButton from '../../../_common/TWFormControls/TWButton';

type Props = {
  onSaveDone: () => void,
  spotsNoPerson: any,
  peopleNoSpot: any
};

type State = {
  selectedPerson: any,
  selectedSpot: any
}

class CreateParkingSpot extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.inputRefs = {
      spotPicker: {},
      personPicker: {},
    };
    this.state = {
      selectedPerson: undefined,
      selectedSpot: undefined,
    };
  }

  inputRefs;

  saveAssignment() {
    const { selectedSpot, selectedPerson } = this.state;
    const newPerson = {
      ...selectedPerson,
      spot: selectedSpot,
    };
    const personKey = selectedPerson.id;
    const { onSaveDone } = this.props;
    firebase.database().ref(`people/${personKey}`).set(newPerson, (error) => {
      if (error) {
        console.warn('The write failed...');
      } else {
        onSaveDone();
      }
    });
  }

  render() {
    const { selectedPerson, selectedSpot } = this.state;
    const { spotsNoPerson, peopleNoSpot } = this.props;

    return (
      <View style={{ padding: '10%' }}>

        <RNPickerSelect
          placeholder={{
            label: I18n.t('screens.admin.assignments.create.form.spotPlaceholder'),
            value: null,
            color: colors.secondary700,
          }}
          placeholderTextColor={colors.secondary700}
          style={{ ...pickerSelectStyles }}
          onDownArrow={() => {
            this.inputRefs.personPicker.togglePicker();
          }}
          items={spotsNoPerson}
          onValueChange={(value) => {
            this.setState({
              selectedSpot: value,
            });
          }}
          ref={(el) => {
            this.inputRefs.spotPicker = el;
          }}
          value={selectedSpot}
        />

        <RNPickerSelect
          placeholder={{
            label: I18n.t('screens.admin.assignments.create.form.personPlaceholder'),
            value: null,
            color: colors.secondary700,
          }}
          placeholderTextColor={colors.secondary700}
          style={{ ...pickerSelectStyles }}
          onUpArrow={() => {
            this.inputRefs.spotPicker.togglePicker();
          }}
          items={peopleNoSpot}
          onValueChange={(value) => {
            this.setState({
              selectedPerson: value,
            });
          }}
          ref={(el) => {
            this.inputRefs.personPicker = el;
          }}
          value={selectedPerson}
        />

        <View style={{ marginTop: 30 }}>
          <TWButton
            i18n="commons.buttons.save"
            onPress={() => this.saveAssignment()}
          />
        </View>
      </View>
    );
  }
}
export default CreateParkingSpot;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueGray500,
    borderRadius: 4,
    color: 'black',
    marginBottom: 4,
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueGray500,
    borderRadius: 4,
    color: 'black',
    marginBottom: 4,
  },
});
