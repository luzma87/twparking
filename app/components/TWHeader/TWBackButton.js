/* @flow */
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from './twHeaderStyles';

// eslint-disable-next-line import/no-unresolved
const leftIcon = require('./images/btn_back.png');

type Props = { onPress: any };

const TWBackButton = ({ onPress }: Props) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => onPress()}
  >
    <Image source={leftIcon} />
  </TouchableOpacity>
);

export default TWBackButton;
