/* @flow */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import OwnerParkingSpotsItem from './OwnerParkingSpotsItem';

type Props = {
  owners: any,
  onCreateClicked: () => void,
  onSaveDone: ()=>void
};

const keyExtractor = owner => owner.id;

const noOwners = () => (
  <EmptyListMessage type="parkings" />
);

class ParkingList extends Component<Props> {
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
    const { onCreateClicked, onSaveDone } = this.props;
    return (
      <OwnerParkingSpotsItem
        owner={owner.item}
        onSaveDone={onSaveDone}
        onCreateClicked={onCreateClicked}
      />
    );
  }

  render() {
    const { owners } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 20 }}>
        {owners.length === 0 ? noOwners() : this.ownersList(owners)}
      </View>
    );
  }
}

export default ParkingList;
