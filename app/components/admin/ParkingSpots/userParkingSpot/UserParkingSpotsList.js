/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../../styles/colors';
import EmptyListMessage from '../../../_common/EmptyListMessage';

type Props = {
  owners: any,
  onCreateClicked: () => void
};

const keyExtractor = owner => owner.id;

const renderItem = () => null;

const ownersList = owners => (
  <FlatList
    data={owners}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
);

const noOwners = () => (
  <EmptyListMessage type="assignments" />
);

const UserParkingSpotsList = (props: Props) => {
  const { owners, onCreateClicked } = props;
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      {owners.length === 0 ? noOwners() : ownersList(owners)}
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
