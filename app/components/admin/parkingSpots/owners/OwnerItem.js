/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import type { Owner } from '../../../../context/types';
import colors from '../../../../styles/colors';
import BankTag from '../../../_common/BankTag/BankTag';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';

type Props = {
  owner: Owner
};

const header = owner => (
  <View>
    <TextWithIcon icon="hat-wizard" color={colors.secondary500} text={owner.name} />
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
      <TextWithIcon icon="at" text={owner.email} textSize="regular" />
      <BankTag bank={owner.bank} />
    </Card>
  );
};

export default OwnerItem;
