/* @flow */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import TWText from '../../_common/TWText/TWText';
import type { Owner } from '../../../context/types';
import colors from '../../../styles/colors';

type Props = {
  owner: Owner
};

const header = owner => (
  <View>
    <View style={{
      flexDirection: 'row',
    }}
    >
      <FontAwesome5Pro
        solid
        size={16}
        name="hat-wizard"
        color={colors.secondary500}
        style={{ height: '100%', marginRight: 8 }}
      />
      <TWText text={owner.name} color={colors.secondary500} />
    </View>
    <View style={{
      backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
    }}
    />
  </View>
);

const OwnerItem = (props: Props) => {
  const { owner } = props;
  return (
    <TouchableOpacity>
      <Card title={header(owner)}>
        <TWText text={owner.email} />
      </Card>
    </TouchableOpacity>
  );
};

export default OwnerItem;
