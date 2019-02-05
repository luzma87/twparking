/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { User } from '../../../../context/types';
import colors from '../../../../styles/colors';
import TextWithIcon from '../../../_common/TWText/TextWithIcon';

type Props = {
  user: User,
  onCreateClicked: () => void
}

const UserCarItemHeader = (props: Props) => {
  const { user, onCreateClicked } = props;
  const icon = user.car ? 'pencil' : 'plus';
  return (
    <View>
      <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
        <TextWithIcon icon="user-astronaut" color={colors.secondary500} text={user.name} />
        <Button
          onPress={onCreateClicked}
          icon={(
            <FontAwesome5Pro
              solid
              size={20}
              name={icon}
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
};

export default UserCarItemHeader;
