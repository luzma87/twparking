/* @flow */
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'react-native-elements';
import twModalStyles from './twModalStyles';

type Props = {
  isVisible: boolean,
};
type State = {};

class TWModal extends Component<Props, State> {
  render() {
    const { isVisible } = this.props;
    return (
      <View
        style={{
          alignSelf: 'center',
        }}
      >
        <Modal
          isVisible={isVisible}
          transparent
          style={twModalStyles.modal}
        >
          <View style={twModalStyles.content}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default TWModal;
