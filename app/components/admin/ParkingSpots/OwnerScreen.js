/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'react-native-firebase';
import { isEmpty } from 'lodash';
import TWText from '../../_common/TWText/TWText';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import navigationHeader from '../../../navigation/NavigationStylesHelper';

const noOwners = () => (
  <View style={{
    alignItems: 'center', justifyContent: 'center', flex: 1,
  }}
  >
    <TWText i18n="screens.admin.owners.empty" weight="bold" multiline align="center" />
  </View>
);

type Props = {
  navigation?: any
};
type State = {
  owners: any
};

class OwnerScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  static defaultProps = {
    navigation: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      owners: [],
    };
    this.getOwners();
  }

  getOwners() {
    console.warn('trying to get owners');
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('owners')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const { owners } = this.state;
            if (isEmpty(owners)) {
              this.setState({ owners: snapshot.val() });
            }
            console.warn('done loading owners');
          }
        }, () => { console.warn('??'); });
    });
  }

  ownersList() {

  }

  render() {
    const { navigation } = this.props;
    const { owners } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => navigation.goBack()}
        i18nTitle="screens.admin.home.tabs.Owners"
      >
        {owners.length === 0 ? noOwners() : this.ownersList()}
      </TWScreenWithNavigationBar>
    );
  }
}

export default OwnerScreen;
