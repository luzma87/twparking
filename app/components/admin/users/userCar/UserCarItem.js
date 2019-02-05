/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import type { User } from '../../../../context/types';
import ColorTag from '../../../_common/ColorTag';
import SizeTag from '../../../_common/SizeTag';
import TWText from '../../../_common/TWText/TWText';
import UserCarItemHeader from './UserCarItemHeader';

type Props = {
  person: User,
  onCreateClicked: User => void,
  onSaveDone: () => void
};

const UserCarItem = (props: Props) => {
  const { person, onCreateClicked, onSaveDone } = props;
  const { car } = person;
  return (
    <Card title={<UserCarItemHeader user={person} onCreateClicked={onCreateClicked} />}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ColorTag color={car.color} style={{ marginRight: 8 }} />
        <TWText text={`${car.brand} ${car.model}`} style={{ marginRight: 8 }} />
        <SizeTag size={car.size} />
      </View>
      <TWText text={car.plate.toUpperCase()} />
    </Card>
  );
};

export default UserCarItem;
