/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { ParkingSpot } from '../../../../context/types';
import colors from '../../../../styles/colors';
import SizeTag from '../../../_common/SizeTag';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';
import TWText from '../../../_common/TWText/TWText';

type Props = {
  parking: ParkingSpot,
  onPress: (boolean) => void
};

const ParkingSpotItem = (props: Props) => {
  const { parking, onPress } = props;
  const icon = parking.active ? 'toggle-on' : 'toggle-off';
  const toggleBgColor = parking.active ? colors.green200 : colors.red200;
  const toggleIconColor = parking.active ? colors.green800 : colors.red800;
  const textColor = parking.active ? colors.primary900 : colors.primary400;
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
    }}
    >
      <View style={{ flexDirection: 'row' }}>
        <TextWithIcon
          icon="warehouse"
          text={`${parking.building} ${parking.number}`}
          textSize="regular"
          color={textColor}
          style={{ marginRight: 8 }}
        />
        <SizeTag size={parking.size} />
      </View>
      <Button
        onPress={() => onPress(!parking.active)}
        icon={(
          <FontAwesome5Pro
            solid
            size={20}
            name={icon}
            color={toggleIconColor}
          />
        )}
        title=""
        buttonStyle={{
          backgroundColor: toggleBgColor,
          borderColor: 'transparent',
          paddingVertical: 4,
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
};
export default ParkingSpotItem;
