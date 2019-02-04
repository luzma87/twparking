/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { Owner } from '../../../../context/types';
import colors from '../../../../styles/colors';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';
import ParkingSpotList from './ParkingSpotList';

type Props = {
  owner: Owner,
  onCreateClicked: (Owner) => void,
  onSaveDone: () => void
};

const header = (owner, onCreateClicked) => (
  <View>
    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
      <TextWithIcon icon="hat-wizard" color={colors.secondary500} text={owner.name} />
      <Button
        onPress={() => onCreateClicked(owner)}
        icon={(
          <FontAwesome5Pro
            solid
            size={20}
            name="plus"
            color={colors.white}
          />
        )}
        title=""
        buttonStyle={{
          backgroundColor: colors.primary300,
          borderColor: 'transparent',
          padding: 8,
          borderRadius: 5,
        }}
      />
    </View>
    <View style={{
      backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
    }}
    />
  </View>
);

const OwnerParkingSpotsItem = (props: Props) => {
  const { owner, onCreateClicked, onSaveDone } = props;
  return (
    <Card title={header(owner, onCreateClicked)}>
      <ParkingSpotList owner={owner} onSaveDone={onSaveDone} />
    </Card>
  );
};

export default OwnerParkingSpotsItem;
