/* @flow */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './twHeaderStyles';
// import headerStyles from '../../../util/navigationStyles';
import TWBackButton from './TWBackButton';
import headerStyles from '../../navigation/navigationStyles';


type Props = { title: string, onPress: ()=>void };

const TWHeader = ({ title, onPress }: Props) => {
  const hasBackButton = onPress !== null;
  const otherStyles = hasBackButton ? styles.containerWithBackButton : {};
  return (
    <View
      style={[
        { height: 75 },
        headerStyles.header,
        styles.container,
        otherStyles,
      ]}
    >
      {hasBackButton ? <TWBackButton onPress={() => onPress()} /> : null}
      <Text style={[headerStyles.headerTitle, styles.text]}>
        {title.toUpperCase()}
      </Text>
      {hasBackButton ? <View style={{ width: 35 }} /> : null}
    </View>
  );
};

export default TWHeader;
