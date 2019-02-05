/* @flow */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import EmptyListMessage from '../../../_common/EmptyListMessage';
import UserCarItem from './UserCarItem';

type Props = {
  people: any,
  onCreateClicked: () => void,
  onSaveDone: ()=>void
};

const keyExtractor = owner => owner.id;

const noOwners = () => (
  <EmptyListMessage type="cars" />
);

class UserCarList extends Component<Props> {
  peopleList(people: Array<any>) {
    return (
      <FlatList
        data={people}
        keyExtractor={keyExtractor}
        renderItem={owner => this.renderItem(owner)}
      />
    );
  }

  renderItem(person: any) {
    const { onCreateClicked, onSaveDone } = this.props;
    return (
      <UserCarItem
        person={person.item}
        onSaveDone={onSaveDone}
        onCreateClicked={onCreateClicked}
      />
    );
  }

  render() {
    const { people } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 20 }}>
        {people.length === 0 ? noOwners() : this.peopleList(people)}
      </View>
    );
  }
}

export default UserCarList;
