/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import twModalStyles from './twModalStyles';
import TWButton from '../TWFormControls/TWButton';
import colors from '../../../styles/colors';
import TWText from '../TWText/TWText';

type Props = {
  isVisible: boolean,
  i18n: string,
  i18nHeader: string,
  onPressYes: () => void,
  onPressNo: () => void,
};
type State = {};

class TWModal extends Component<Props, State> {
  render() {
    const {
      isVisible, i18n, i18nHeader, onPressYes, onPressNo,
    } = this.props;
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
            <TWText
              multiline
              animationInTiming={400}
              animationOutTiming={600}
              i18n={i18nHeader}
              align="center"
              weight="bold"
            />
            <TWText
              multiline
              i18n={i18n}
              align="center"
              style={{ paddingHorizontal: 20 }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-between',
              }}
            >
              <TWButton
                i18n="commons.buttons.no"
                icon="thumbs-down"
                buttonStyle={{
                  width: '80%',
                  backgroundColor: colors.primary900,
                }}
                onPress={onPressNo}
              />

              <TWButton
                i18n="commons.buttons.yes"
                icon="thumbs-up"
                buttonStyle={{ width: '80%', backgroundColor: colors.secondary500 }}
                onPress={onPressYes}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default TWModal;
