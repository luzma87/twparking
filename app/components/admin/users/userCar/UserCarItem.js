/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import type { User } from '../../../../context/types';
import colors from '../../../../styles/colors';
import ColorTag from '../../../_common/ColorTag';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import SizeTag from '../../../_common/SizeTag';
import FontAwesome5Pro from '../../../_common/TWText/TextWithIcon';
import TWText from '../../../_common/TWText/TWText';
import UserCarItemHeader from './UserCarItemHeader';

type Props = {
  person: User,
  onCreateClicked: User => void,
};

const carDetails = (car) => {
  if (car) {
    return (
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5Pro
            solid
            size={12}
            icon="space-shuttle"
            color={colors.primary700}
            style={{ marginRight: 8 }}
          />
          <ColorTag color={car.color} style={{ marginRight: 8 }} />
          <TWText text={`${car.brand} ${car.model}`} style={{ marginRight: 8 }} />
          <SizeTag size={car.size} />
        </View>
        <TWText text={car.plate.toUpperCase()} />
      </>
    );
  }
  return <EmptyListMessage type="cars" />;
};

const UserCarItem = (props: Props) => {
  const { person, onCreateClicked } = props;
  const { car } = person;
  return (
    <Card title={(
      <UserCarItemHeader
        user={person}
        onCreateClicked={() => onCreateClicked(person)}
      />
    )}
    >
      {carDetails(car)}
    </Card>
  );
};

export default UserCarItem;
