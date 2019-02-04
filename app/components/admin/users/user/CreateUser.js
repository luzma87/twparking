/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-elements';
import firebase from 'react-native-firebase';
import type { User } from '../../../../context/types';
import colors from '../../../../styles/colors';
import InputForm from '../../../_common/InputForm/InputForm';
import TWButton from '../../../_common/TWFormControls/TWButton';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';

const CAR_RATING_IMAGE = require('../../../../../assets/images/ratingCarGrayBg.png');

type Props = {
  onSaveDone: () => void,
  selectedUser: ?User
};

type State = {
  user: User
}

class CreateUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let user = {
      id: '',
      admin: '',
      bank: '',
      champion: '',
      ci: '',
      name: '',
      parkingStars: 0,
      phone: '',
      user: '',
      enabled: true,
    };
    if (props.selectedUser) {
      user = props.selectedUser;
    }
    this.state = {
      user,
    };
  }

  mergeUser(newData: Object) {
    const { user } = this.state;
    const newUser = { ...user, ...newData };
    this.setState({ user: newUser });
  }

  toggleProp(prop: string) {
    const { user } = this.state;
    const oldProp = user[prop];
    user[prop] = !oldProp;
    this.setState({ user });
  }

  save() {
    const { user } = this.state;
    const { onSaveDone, selectedUser } = this.props;
    let userKey;
    if (selectedUser) {
      userKey = selectedUser.id;
    } else {
      userKey = firebase.database().ref().child('people').push().key;
      user.id = userKey;
    }
    firebase.database().ref(`people/${userKey}`).set(user, (error) => {
      if (error) {
        console.warn('The write failed...');
      } else {
        onSaveDone();
      }
    });
  }

  render() {
    const { user } = this.state;
    const championIcon = user.champion ? 'user-crown' : 'user';
    const isChampion = user.champion ? 'yes' : 'no';
    const adminIcon = user.admin ? 'alicorn' : 'horse';
    const isAdmin = user.admin ? 'yes' : 'no';
    const parkingStars = parseInt(user.parkingStars, 10);
    return (
      <View style={{ padding: '10%' }}>
        <InputForm
          field={user.name}
          i18nLabel="screens.admin.users.create.form.name"
          i18nPlaceholder="screens.admin.users.create.form.namePlaceholder"
          inputProps={{ autoFocus: true }}
          onChangeText={value => this.mergeUser({ name: value })}
        />
        <InputForm
          field={user.user}
          i18nLabel="screens.admin.users.create.form.user"
          i18nPlaceholder="screens.admin.users.create.form.userPlaceholder"
          inputProps={{ autoFocus: true }}
          onChangeText={value => this.mergeUser({ user: value })}
        />
        <InputForm
          field={user.bank}
          i18nLabel="screens.admin.users.create.form.bank"
          i18nPlaceholder="screens.admin.users.create.form.bankPlaceholder"
          inputProps={{ autoFocus: false }}
          onChangeText={value => this.mergeUser({ bank: value })}
        />
        <InputForm
          field={user.ci}
          i18nLabel="screens.admin.users.create.form.ci"
          i18nPlaceholder="screens.admin.users.create.form.ciPlaceholder"
          inputProps={{ autoFocus: false }}
          onChangeText={value => this.mergeUser({ ci: value })}
        />
        <InputForm
          field={user.phone}
          i18nLabel="screens.admin.users.create.form.phone"
          i18nPlaceholder="screens.admin.users.create.form.phonePlaceholder"
          inputProps={{ autoFocus: false }}
          onChangeText={value => this.mergeUser({ phone: value })}
        />
        <Rating
          type="custom"
          ratingImage={CAR_RATING_IMAGE}
          ratingColor={colors.secondary500}
          ratingBackgroundColor={colors.primary200}
          startingValue={parkingStars}
          imageSize={32}
          fractions={0}
          style={{ marginBottom: 8 }}
          onFinishRating={stars => this.mergeUser({ parkingStars: stars })}
        />
        <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => this.toggleProp('admin')}>
          <TextWithIcon
            icon={adminIcon}
            i18n={`screens.admin.users.create.form.admin.${isAdmin}`}
            textSize="regular"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggleProp('champion')}>
          <TextWithIcon
            icon={championIcon}
            i18n={`screens.admin.users.create.form.champion.${isChampion}`}
            textSize="regular"
          />
        </TouchableOpacity>
        <TWButton i18n="commons.buttons.save" onPress={() => this.save()} style={{ marginTop: 30 }} />
      </View>
    );
  }
}
export default CreateUser;
