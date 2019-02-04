/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../../styles/colors';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';

type Props = {
  people: any,
  onCreateClicked: () => void
};

const keyExtractor = owner => owner.id;

const renderItem = (element) => {
  const person = element.item;
  const personName = person.name;
  const personBuilding = `${person.spot.building} #${person.spot.number}`;
  const personCar = `${person.car.brand} ${person.car.model} [${person.car.plate.toUpperCase()}]`;
  return (
    <Card key={person.id}>
      <TextWithIcon icon="user" color={colors.secondary600} text={personName} textSize="regular" style={{ marginBottom: 8 }} />
      <TextWithIcon icon="warehouse" color={colors.primary600} text={personBuilding} textSize="regular" style={{ marginBottom: 8 }} />
      <TextWithIcon icon="car" color={colors.blue600} text={personCar} textSize="regular" />
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
