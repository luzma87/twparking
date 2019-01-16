/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import TWText from '../../../_common/TWText/TWText';
import type { Owner } from '../../../../context/types';
import colors from '../../../../styles/colors';
import BankTag from '../../../_common/BankTag/BankTag';

type Props = {
  owner: Owner
};

const header = owner => (
  <View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5Pro
        solid
        size={24}
        name="hat-wizard"
        color={colors.secondary500}
        style={{ height: '100%', marginRight: 8 }}
      />
      <TWText text={owner.name} color={colors.secondary500} font="vt323" size="title" />
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
    <Card title={header(owner)}>
      <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
        <FontAwesome5Pro
          solid
          size={16}
          name="at"
          color={colors.primary800}
          style={{ marginRight: 8 }}
        />
        <TWText text={owner.email} font="vt323" />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
        <BankTag bank={owner.bank} style={{ marginRight: 8 }} />
        <TWText text={owner.bank} font="vt323" />
      </View>
    </Card>
  );
};

export default OwnerItem;
