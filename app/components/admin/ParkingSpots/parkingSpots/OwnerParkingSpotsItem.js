/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { Owner } from '../../../../context/types';
import colors from '../../../../styles/colors';
import TWText from '../../../_common/TWText/TWText';


type Props = {
  owner: Owner,
  onCreateClicked: (Owner) => void
};

const header = (owner, onCreateClicked) => (
  <View>
    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <FontAwesome5Pro
          solid
          size={24}
          name="hat-wizard"
          color={colors.secondary500}
          style={{ height: '100%', marginRight: 8 }}
        />
        <TWText text={owner.name} color={colors.secondary500} font="vt323" size="title" />
      </View>
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
          borderRadius: 50,
        }}
      />
    </View>
    <View style={{
      backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
    }}
    />
    <View>
      {owner.parkingSpots && owner.parkingSpots.map(parking => (
        <TWText
          key={`${parking.building}${parking.number}`}
          font="vt323"
          i18n="screens.admin.parking.list"
          i18nParams={{ building: parking.building, number: parking.number, size: parking.size }}
        />
      ))}
    </View>
  </View>
);

const OwnerParkingSpotsItem = (props: Props) => {
  const { owner, onCreateClicked } = props;
  return (
    <Card title={header(owner, onCreateClicked)} />
  );
};

export default OwnerParkingSpotsItem;
