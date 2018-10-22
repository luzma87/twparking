/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Button } from 'react-native-elements';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import { withContext } from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';

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

        <Button
          icon={(
            <FontAwesome5Pro
              solid
              size={16}
              name="user-ninja"
              color="white"
            />
          )}
          title="Change to normal view"
          onPress={() => {
            this.changeUser();
          }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

export default withContext(AdminProfile);
