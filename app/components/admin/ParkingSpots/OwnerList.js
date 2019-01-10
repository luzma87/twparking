/* @flow */
import React from 'react';
import { View } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';
import TWText from '../../_common/TWText/TWText';

type Props = {
  owners: any,
  onCreateClicked: () => void
};

const ownersList = owners => (
  <View>
    {owners.map(owner => <TWText text={`${owner.name} - ${owner.email}`} />)}
  </View>
);

const noOwners = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <TWText i18n="screens.admin.owners.empty" weight="bold" multiline align="center" />
  </View>
);

const OwnerList = (props: Props) => {
  const { owners, onCreateClicked } = props;
  return (
    <View style={{ flex: 1, padding: '5%' }}>
      {owners.length === 0 ? noOwners() : ownersList(owners)}
      <ActionButton
        buttonColor={colors.secondary500}
        onPress={onCreateClicked}
        renderIcon={() => (
          <FontAwesome5Pro
            solid
            size={16}
            name="user-plus"
            color={colors.white}
          />
        )}
      />
    </View>
  );
};

export default OwnerList;
