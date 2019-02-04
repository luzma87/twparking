/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { ParkingSpot } from '../../../../context/types';
import colors from '../../../../styles/colors';
import TWText from '../../../_common/TWText/TWText';

type Props = {
  parking: ParkingSpot,
  onPress: (boolean) => void
};

const ParkingSpotItem = (props: Props) => {
  const { parking, onPress } = props;
  const icon = parking.active ? 'toggle-on' : 'toggle-off';
  const color = parking.active ? colors.green200 : colors.red200;
  const iconColor = parking.active ? colors.green800 : colors.red800;
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
    }}
    >
      <TWText
        font="vt323"
        i18n="screens.admin.parking.list"
        color={parking.active ? colors.primary900 : colors.primary400}
        i18nParams={{ building: parking.building, number: parking.number, size: parking.size }}
      />
      <Button
        onPress={() => onPress(!parking.active)}
        icon={(
          <FontAwesome5Pro
            solid
            size={20}
            name={icon}
            color={iconColor}
          />
        )}
        title=""
        buttonStyle={{
          backgroundColor: color,
          borderColor: 'transparent',
          paddingVertical: 4,
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
};
export default ParkingSpotItem;
