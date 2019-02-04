/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import TextWithIcon from '../../_common/TWText/TextWithIcon';
import TWText from '../../_common/TWText/TWText';
import colors from '../../../styles/colors';
import BankTag from '../../_common/BankTag/BankTag';
import type { User } from '../../../context/types';

const CAR_RATING_IMAGE = require('../../../../assets/images/ratingCarWhiteBg.png');
const DISABLED_CAR_RATING_IMAGE = require('../../../../assets/images/ratingCarGrayBg.png');

type Props = {
  user: User
};

const header = (owner, color) => (
  <View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5Pro
        solid
        size={24}
        name="user-astronaut"
        color={color}
        style={{ marginRight: 8 }}
      />
      <TWText text={owner.name} color={color} font="vt323" size="title" />
    </View>
    <View style={{
      backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
    }}
    />
  </View>
);

const UserItem = (props: Props) => {
  const { user } = props;
  const backgroundColor = user.enabled ? colors.white : colors.blueGray100;
  const userAdminIcon = user.admin ? 'alicorn' : 'horse';
  const userAdminText = user.admin ? 'screens.admin.users.admin' : 'screens.admin.users.nonAdmin';
  const userChampionIcon = user.champion ? 'user-crown' : 'user';
  const userChampionText = user.champion ? 'screens.admin.users.champion' : 'screens.admin.users.nonChampion';
  const userParkingStars = parseInt(user.parkingStars, 10);
  const containerStyles = {
    backgroundColor,
  };
  const primaryColor = user.enabled ? colors.primary800 : colors.primary300;
  const secondaryColor = user.enabled ? colors.secondary500 : colors.secondary200;
  if (!user.enabled) {
    containerStyles.borderColor = colors.blueGray200;
  }
  return (
    <Card title={header(user, secondaryColor)} containerStyle={containerStyles}>
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
    </Card>
  );
};

export default UserItem;
