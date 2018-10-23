/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import { withContext } from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import TWButton from '../_common/TWButton/TWButton';

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
      <View>
        <TWText text={`this is the AdminProfile screen [${context ? context.user.name : ''}]`} />
        <TWButton
          i18n="toggles.toRegular"
          icon="user-ninja"
          onPress={() => this.changeUser()}
        />
      </View>
    );
  }
}

export default withContext(AdminProfile);
