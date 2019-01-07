/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';

type Props = {
  onPress: (any)=>void
};
type State = {};

class TWClose extends Component<Props, State> {
  render() {
    const { onPress } = this.props;
    return (
      <View style={{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1001,
      }}
      >
        <TouchableOpacity onPress={onPress}>
          <FontAwesome5Pro
            size={50}
            name="backspace"
            color={colors.primary600}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TWClose;
