/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';
import EmptyListMessage from '../../_common/EmptyListMessage';
import UserItem from './UserItem';

type Props = {
  users: any,
  onCreateClicked: () => void
};

const keyExtractor = user => user.id;

const renderItem = user => (<UserItem key={user.item.id} user={user.item} />);

const list = owners => (
  <FlatList
    data={owners}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
);

const noData = () => (
  <EmptyListMessage type="users" />
);

const UserList = (props: Props) => {
  const { users, onCreateClicked } = props;
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      {users.length === 0 ? noData() : list(users)}
      <ActionButton
        buttonColor={colors.secondary500}
        onPress={onCreateClicked}
        renderIcon={() => (
          <FontAwesome5Pro
            solid
            size={20}
            name="user-plus"
            color={colors.white}
          />
        )}
      />
    </View>
  );
};

export default UserList;
