/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import withContext from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import TWButton from '../_common/TWFormControls/TWButton';
import colors from '../../styles/colors';

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {};

class AdminProfile extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    const { context } = this.props;
    return (
      <View style={{ alignItems: 'center', padding: 16 }}>
        <TWText text={`this is the AdminProfile screen [${context ? context.user.name : ''}]`} />

        <View style={{ paddingHorizontal: 16 }}>
          <TWButton
            i18n="toggles.toRegular"
            icon="user"
            buttonColor={colors.primary700}
            onPress={() => this.changeUser()}
            style={{ marginVertical: 40 }}
          />
        </View>
      </View>
    );
  }
}

export default withContext(AdminProfile);
