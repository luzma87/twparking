/* @flow */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { User } from '../../../../context/types';
import colors from '../../../../styles/colors';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import UserItem from './UserItem';

type Props = {
  users: any,
  onCreateClicked: () => void,
  onEditClicked: User => void,
  onSaveDone: () => void
};

const keyExtractor = user => user.id;

const noData = () => (
  <EmptyListMessage type="users" />
);

class UserList extends Component<Props> {
  list(owners) {
    return (
      <FlatList
        data={owners}
        keyExtractor={keyExtractor}
        renderItem={user => this.renderItem(user)}
      />
    );
  }

  renderItem(user) {
    const { onSaveDone, onEditClicked } = this.props;
    return (
      <UserItem
        key={user.item.id}
        user={user.item}
        onSaveDone={onSaveDone}
        onEditClicked={onEditClicked}
      />
    );
  }

  render() {
    const { users, onCreateClicked } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 20 }}>
        {users.length === 0 ? noData() : this.list(users)}
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
  }
}

export default UserList;
