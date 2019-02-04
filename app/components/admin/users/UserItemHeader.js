// @flow
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import type { User } from '../../../context/types';
import colors from '../../../styles/colors';
import TextWithIcon from '../../_common/TWText/TextWithIcon';
import TWText from '../../_common/TWText/TWText';

type Props = {
  user: User,
  toggleEnabled: ()=>void,
  color: string
}

const UserItemHeader = (props: Props) => {
  const { user, toggleEnabled, color } = props;
  const icon = user.enabled ? 'toggle-on' : 'toggle-off';
  const toggleBgColor = user.enabled ? colors.green200 : colors.red200;
  const toggleIconColor = user.enabled ? colors.green800 : colors.red800;
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextWithIcon icon="user-astronaut" text={user.name} color={color} />
        <Button
          onPress={() => toggleEnabled()}
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
      <View style={{
        backgroundColor: colors.secondary200, height: 1, width: '100%', marginBottom: 8,
      }}
      />
    </View>
  );
};

export default UserItemHeader;
