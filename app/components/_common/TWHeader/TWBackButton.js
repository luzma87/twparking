/* @flow */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './twHeaderStyles';
import colors from '../../../styles/colors';

type Props = { onPress: any };

const TWBackButton = ({ onPress }: Props) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => onPress()}
  >
    <FontAwesome5Pro
      solid
      size={30}
      name="chevron-left"
      color={colors.secondary500}
    />
  </TouchableOpacity>
);

export default TWBackButton;
