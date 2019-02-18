/* @flow */
import React, { Component } from 'react';
import { Card, Rating } from 'react-native-elements';
import firebase from 'react-native-firebase';
import type { User } from '../../../../context/types';
import colors from '../../../../styles/colors';
import BankTag from '../../../_common/BankTag/BankTag';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';
import EditButton from '../../_common/EditButton';
import UserItemHeader from './UserItemHeader';

const CAR_RATING_IMAGE = require('../../../../../assets/images/ratingCarWhiteBg.png');
const DISABLED_CAR_RATING_IMAGE = require('../../../../../assets/images/ratingCarGrayBg.png');

type Props = {
  user: User,
  onSaveDone: () => void,
  onEditClicked: User => void
};

class UserItem extends Component<Props> {
  toggleEnabled() {
    const { user, onSaveDone } = this.props;
    user.enabled = !user.enabled;
    const userKey = user.id;

    firebase.database().ref(`people/${userKey}`).set(user, (error) => {
      if (error) {
        console.warn('The write failed...', error);
      } else {
        onSaveDone();
      }
    });
  }

  render() {
    const { user, onEditClicked } = this.props;
    const backgroundColor = user.enabled ? colors.white : colors.blueGray100;
    const userAdminIcon = user.admin ? 'alicorn' : 'horse';
    const userAdminText = user.admin ? 'screens.admin.users.admin' : 'screens.admin.users.nonAdmin';
    const userChampionIcon = user.champion ? 'user-crown' : 'user';
    const userChampionText = user.champion ? 'screens.admin.users.champion' : 'screens.admin.users.nonChampion';
    const userParkingStars = parseInt(user.parkingStars, 10);
    const containerStyles = {
      backgroundColor,
      ...user.enabled ? { borderColor: colors.blueGray200 } : {}
    };
    const primaryColor = user.enabled ? colors.primary800 : colors.primary300;
    const secondaryColor = user.enabled ? colors.secondary500 : colors.secondary200;
    return (
      <Card
        title={(
          <UserItemHeader
            user={user}
            toggleEnabled={() => this.toggleEnabled()}
            color={secondaryColor}
          />
        )}
        containerStyle={containerStyles}
      >
        <Rating
          type="custom"
          ratingImage={user.enabled ? CAR_RATING_IMAGE : DISABLED_CAR_RATING_IMAGE}
          ratingColor={secondaryColor}
          ratingBackgroundColor={colors.primary200}
          startingValue={userParkingStars}
          readonly
          imageSize={24}
          style={{ marginBottom: 8 }}
        />
        <TextWithIcon icon="user-tag" text={user.user} textSize="regular" color={primaryColor} />
        <TextWithIcon icon="id-card" text={user.ci} textSize="regular" color={primaryColor} />
        <TextWithIcon icon="mobile-android-alt" text={user.phone} textSize="regular" color={primaryColor} />
        <TextWithIcon icon={userAdminIcon} i18n={userAdminText} textSize="regular" color={primaryColor} />
        <TextWithIcon icon={userChampionIcon} i18n={userChampionText} textSize="regular" color={primaryColor} />
        <BankTag bank={user.bank} textProps={{ color: primaryColor }} />
        <EditButton onEditClicked={() => onEditClicked(user)} />
      </Card>
    );
  }
}

export default UserItem;
