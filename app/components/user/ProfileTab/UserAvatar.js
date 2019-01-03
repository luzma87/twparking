/* @flow */
import React from 'react';
import { Image, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import _ from 'lodash';

const crown = require('./images/crown_champ.png');
const skull1 = require('./images/skull1.png');
const skull2 = require('./images/skull2.png');
const skull3 = require('./images/skull3.png');
const skull4 = require('./images/skull4.png');
const skull5 = require('./images/skull5.png');
const skull6 = require('./images/skull6.png');
const skull7 = require('./images/skull7.png');
const skull8 = require('./images/skull8.png');
const skull9 = require('./images/skull9.png');
const skull10 = require('./images/skull10.png');
const skull11 = require('./images/skull11.png');
const skull12 = require('./images/skull12.png');

const avatars = [
  skull1, skull2, skull3, skull4, skull5, skull6, skull7, skull8, skull9, skull10, skull11, skull12,
];

type Props = {
  isAdmin: boolean,
  style: Object
};

const UserAvatar = (props: Props) => {
  const { isAdmin, style } = props;
  return (
    <View style={{
      alignItems: 'center',
      ...style,
    }}
    >
      <Avatar
        rounded
        size="xlarge"
        source={_.sample(avatars)}
        imageProps={{
          resizeMode: 'contain',
        }}
      />
      {isAdmin ? (
        <Image
          source={crown}
          resizeMode="contain"
          style={{
            height: 80,
            position: 'absolute',
            top: -55,
            left: -135,
            transform: [{ rotate: '15deg' }],
          }}
        />
      ) : null}
    </View>
  );
};
export default UserAvatar;
