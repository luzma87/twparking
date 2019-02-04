/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Card, Rating } from 'react-native-elements';
import firebase from 'react-native-firebase';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { User } from '../../../context/types';
import colors from '../../../styles/colors';
import BankTag from '../../_common/BankTag/BankTag';
import TextWithIcon from '../../_common/TWText/TextWithIcon';
import TWText from '../../_common/TWText/TWText';

const CAR_RATING_IMAGE = require('../../../../assets/images/ratingCarWhiteBg.png');
const DISABLED_CAR_RATING_IMAGE = require('../../../../assets/images/ratingCarGrayBg.png');

type Props = {
  user: User,
  onSaveDone: ()=>void
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

  header(color) {
    const { user } = this.props;
    const icon = user.enabled ? 'toggle-on' : 'toggle-off';
    const toggleBgColor = user.enabled ? colors.green200 : colors.red200;
    const toggleIconColor = user.enabled ? colors.green800 : colors.red800;
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5Pro
              solid
              size={24}
              name="user-astronaut"
              color={color}
              style={{ marginRight: 8 }}
            />
            <TWText text={user.name} color={color} font="vt323" size="title" />
          </View>
          <Button
            onPress={() => this.toggleEnabled()}
            icon={(
              <FontAwesome5Pro
                solid
                size={20}
                name={icon}
                color={toggleIconColor}
              />
            )}
            title=""
            buttonStyle={{
              backgroundColor: toggleBgColor,
              borderColor: 'transparent',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          />
        </View>
        <View style={{
          backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
        }}
        />
      </View>
    );
  }

  render() {
    const { user } = this.props;
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
      <Card title={this.header(secondaryColor)} containerStyle={containerStyles}>
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
  }
}

export default UserItem;
