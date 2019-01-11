/* @flow */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './twHeaderStyles';
import colors from '../../../styles/colors';

type Props = {
  onPress: any,
  visible: boolean
};

const icon = (
  <FontAwesome5Pro
    solid
    size={30}
    name="chevron-left"
    color={colors.secondary500}
  />
);

const visibleButton = onPress => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => onPress && onPress()}
  >
    {icon}
  </TouchableOpacity>
);

const invisibleButton = () => (
  <View style={[styles.backButton, { opacity: 0}]}>
    {icon}
  </View>
);

const TWBackButton = ({ onPress, visible }: Props) => (
  visible ? visibleButton(onPress) : invisibleButton()
);

export default TWBackButton;
