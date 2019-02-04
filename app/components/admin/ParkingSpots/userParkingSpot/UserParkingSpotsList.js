/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../../styles/colors';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import TWText from '../../../_common/TWText/TWText';

type Props = {
  people: any,
  onCreateClicked: () => void
};

const keyExtractor = owner => owner.id;

const textWithIcon = (icon, text, color, bold) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
    <FontAwesome5Pro
      solid
      name={icon}
      size={16}
      color={colors[color]}
      style={{ marginRight: 8 }}
    />
    <TWText text={text} font="vt323" color={colors[color]} weight={bold ? 'bold' : 'regular'} />
  </View>
);

const renderItem = (element) => {
  const person = element.item;
  const personName = person.name;
  const personBuilding = `${person.spot.building} #${person.spot.number}`;
  const personCar = `${person.car.brand} ${person.car.model} [${person.car.plate.toUpperCase()}]`;
  return (
    <Card>
      {textWithIcon('user', personName, 'secondary600', true)}
      {textWithIcon('warehouse', personBuilding, 'primary600')}
      {textWithIcon('car', personCar, 'blue600')}
    </Card>
  );
};

const userParkingSpotsList = owners => (
  <FlatList
    data={owners}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
);

const noUserParkingSpots = () => (
  <EmptyListMessage type="assignments" />
);

const UserParkingSpotsList = (props: Props) => {
  const { people, onCreateClicked } = props;
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      {people.length === 0 ? noUserParkingSpots() : userParkingSpotsList(people)}
      <ActionButton
        buttonColor={colors.secondary500}
        onPress={onCreateClicked}
        renderIcon={() => (
          <FontAwesome5Pro
            solid
            size={20}
            name="plus"
            color={colors.white}
          />
        )}
      />
    </View>
  );
};

export default UserParkingSpotsList;
