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

type Props = {
  user: User
};

const header = owner => (
  <View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5Pro
        solid
        size={24}
        name="user-astronaut"
        color={colors.secondary500}
        style={{ marginRight: 8 }}
      />
      <TWText text={owner.name} color={colors.secondary500} font="vt323" size="title" />
    </View>
    <View style={{
      backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
    }}
    />
  </View>
);

const UserItem = (props: Props) => {
  const { user } = props;
  const userAdminIcon = user.admin ? 'alicorn' : 'horse';
  const userAdminText = user.admin ? 'screens.admin.users.admin' : 'screens.admin.users.nonAdmin';
  const userChampionIcon = user.champion ? 'user-crown' : 'user';
  const userChampionText = user.champion ? 'screens.admin.users.champion' : 'screens.admin.users.nonChampion';
  const userParkingStars = parseInt(user.parkingStars, 10);
  return (
    <Card title={header(user)}>
      <Rating
        type="custom"
        ratingImage={CAR_RATING_IMAGE}
        ratingColor={colors.secondary500}
        ratingBackgroundColor={colors.primary200}
        startingValue={userParkingStars}
        readonly
        imageSize={24}
        style={{ marginBottom: 8 }}
      />
      <TextWithIcon icon="user-tag" text={user.user} textSize="regular" />
      <TextWithIcon icon="id-card" text={user.ci} textSize="regular" />
      <TextWithIcon icon="mobile-android-alt" text={user.phone} textSize="regular" />
      <TextWithIcon icon={userAdminIcon} i18n={userAdminText} textSize="regular" />
      <TextWithIcon icon={userChampionIcon} i18n={userChampionText} textSize="regular" />
      <BankTag bank={user.bank} />
    </Card>
  );
};

export default UserItem;
