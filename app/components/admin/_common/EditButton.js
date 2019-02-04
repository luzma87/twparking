/* @flow */
import React from 'react';
import { Button } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

type Props = {
  onEditClicked: () => void
};

const EditButton = (props: Props) => {
  const { onEditClicked } = props;
  return (
    <Button
      onPress={() => onEditClicked()}
      icon={(
        <FontAwesome5Pro
          solid
          size={16}
          name="pencil"
          color={colors.secondary700}
          style={{ marginRight: 8 }}
        />
      )}
      title="Edit"
      style={{ marginTop: 16 }}
      titleStyle={{
        fontFamily: fonts.vt323.regular,
        color: colors.secondary700,
      }}
      buttonStyle={{
        backgroundColor: colors.secondary100,
        borderColor: 'transparent',
        paddingVertical: 4,
        paddingHorizontal: 8,
      }}
    />
  );
};
export default EditButton;
