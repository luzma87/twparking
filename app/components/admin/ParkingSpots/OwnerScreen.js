/* @flow */
import React, { Component } from 'react';
import TWText from '../../_common/TWText/TWText';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import navigationHeader from '../../../navigation/NavigationStylesHelper';

type Props = {
  navigation?: any
};
type State = {};

class OwnerScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  static defaultProps = {
    navigation: undefined,
  };

  render() {
    const { navigation } = this.props;
    return (
      <TWScreenWithNavigationBar
        onPress={() => console.warn('pepe')}
        i18nTitle="screens.admin.home.tabs.Owners"
      >
        <TWText text="owners" />
      </TWScreenWithNavigationBar>
    );
  }
}

export default OwnerScreen;
