/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import type { ParkingSpot, Owner } from '../../../../context/types';
import ParkingSpotItem from './ParkingSpotItem';

type Props = {
  owner: Owner,
  onSaveDone: ()=>void
};

class ParkingSpotList extends Component<Props> {
  toggleEnabled(parking: ParkingSpot, enabled: boolean, index: number) {
    const { owner, onSaveDone } = this.props;
    const newParking = { ...parking };
    newParking.active = enabled;
    owner.parkingSpots[index] = newParking;
    const ownerKey = owner.id;

    firebase.database().ref(`owners/${ownerKey}`).set(owner, (error) => {
      if (error) {
        console.warn('The write failed...', error);
      } else {
        onSaveDone();
      }
    });
  }

  render() {
    const { owner } = this.props;
    const { parkingSpots } = owner;
    if (!parkingSpots || parkingSpots.length === 0) {
      return null;
    }
    return (
      <View>
        {parkingSpots.map((parking, index) => (
          <ParkingSpotItem
            onPress={active => this.toggleEnabled(parking, active, index)}
            key={`${parking.building}${parking.number}`}
            parking={parking}
          />
        ))}
      </View>
    );
  }
}

export default ParkingSpotList;
