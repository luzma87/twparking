/* @flow */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { Owner } from '../../../../context/types';
import colors from '../../../../styles/colors';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import OwnerItem from './OwnerItem';

type Props = {
  owners: any,
  onEditClicked: (Owner) => void,
  onCreateClicked: () => void
};

const keyExtractor = owner => owner.id;

const noOwners = () => (
  <EmptyListMessage type="owners" />
);

class OwnerList extends Component<Props> {
  ownersList(owners: Array<any>) {
    return (
      <FlatList
        data={owners}
        keyExtractor={keyExtractor}
        renderItem={owner => this.renderItem(owner)}
      />
    );
  }

  renderItem(owner: any) {
    const { onEditClicked } = this.props;
    return (
      <OwnerItem
        key={owner.item.id}
        owner={owner.item}
        onEditClicked={onEditClicked}
      />
    );
  }

  render() {
    const { owners, onCreateClicked } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 20 }}>
        {owners.length === 0 ? noOwners() : this.ownersList(owners)}
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

export default OwnerList;
