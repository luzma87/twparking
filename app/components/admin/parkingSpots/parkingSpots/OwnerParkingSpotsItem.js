/* @flow */
import React from 'react';
import { Card } from 'react-native-elements';
import type { Owner } from '../../../../context/types';
import OwnerParkingSpotsItemHeader from './OwnerParkingSpotsItemHeader';
import ParkingSpotList from './ParkingSpotList';

type Props = {
  owner: Owner,
  onCreateClicked: (Owner) => void,
  onSaveDone: () => void
};

const OwnerParkingSpotsItem = (props: Props) => {
  const { owner, onCreateClicked, onSaveDone } = props;
  return (
    <Card title={<OwnerParkingSpotsItemHeader owner={owner} onCreateClicked={onCreateClicked} />}>
      <ParkingSpotList owner={owner} onSaveDone={onSaveDone} />
    </Card>
  );
};

export default OwnerParkingSpotsItem;
