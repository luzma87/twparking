/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import InputForm from '../../_common/InputForm/InputForm';
import type { Owner } from '../../../context/types';
import TWButton from '../../_common/TWFormControls/TWButton';

type Props = {
  onSaveDone: () => void
};

type State = {
  owner: Owner
}

class CreateOwner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      owner: {
        name: '',
        email: '',
      },
    };
  }

  mergeOwner(newData: Object) {
    const { owner } = this.state;
    const newOwner = { ...owner, ...newData };
    this.setState({ owner: newOwner });
  }

  saveOwner() {
    const { owner } = this.state;
    const { onSaveDone } = this.props;
    const newOwnerKey = firebase.database().ref().child('owners').push().key;
    firebase.database().ref(`owners/${newOwnerKey}`).set(owner, (error) => {
      if (error) {
        console.warn('The write failed...');
      } else {
        onSaveDone();
      }
    });
  }

  render() {
    const { owner } = this.state;
    return (
      <View style={{ padding: '10%' }}>
        <InputForm
          field={owner.name}
          i18nLabel="screens.admin.owners.create.form.name"
          i18nPlaceholder="screens.admin.owners.create.form.namePlaceholder"
          inputProps={{ autoFocus: true }}
          onChangeText={(value) => {
            this.mergeOwner({ name: value });
          }}
        />
        <InputForm
          field={owner.email}
          i18nLabel="screens.admin.owners.create.form.email"
          i18nPlaceholder="screens.admin.owners.create.form.emailPlaceholder"
          inputProps={{ type: 'email', autoFocus: false }}
          onChangeText={(value) => {
            this.mergeOwner({ email: value });
          }}
        />
        <TWButton i18n="commons.buttons.save" onPress={() => this.saveOwner()} style={{ marginTop: 30 }} />
      </View>
    );
  }
}
export default CreateOwner;
