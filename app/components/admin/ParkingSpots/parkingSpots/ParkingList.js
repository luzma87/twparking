/* @flow */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import TWText from '../../../_common/TWText/TWText';
import OwnerParkingSpotsItem from './OwnerParkingSpotsItem';
import type { Owner } from '../../../../context/types';

type Props = {
  owners: any,
  onCreateClicked: () => void
};

const keyExtractor = owner => owner.id;

const noOwners = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <TWText i18n="screens.admin.owners.empty" weight="bold" multiline align="center" font="vt323" size="title" />
  </View>
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
    const { onCreateClicked } = this.props;
    return <OwnerParkingSpotsItem owner={owner.item} onCreateClicked={onCreateClicked} />;
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
