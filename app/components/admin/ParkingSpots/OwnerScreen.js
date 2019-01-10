/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import OwnerList from './OwnerList';
import CreateOwner from './CreateOwner';

type Props = {
  navigation: any
};
type State = {
  owners: any,
  creating: boolean
};

class OwnerScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      owners: [],
      creating: false,
    };
    this.getOwners();
  }

  getOwners() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('owners')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            this.setState({ owners: snapshot.val() });
          }
        }, () => { console.warn('??'); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Owners';
    }
    return 'screens.admin.owners.create.title';
  }

  showCreateOwner() {
    this.setState({ creating: true });
  }

  hideCreateOwner() {
    this.getOwners();
    this.setState({ creating: false });
  }

  goBack() {
    const { navigation } = this.props;
    const { creating } = this.state;
    if (!creating) {
      navigation.goBack();
    } else {
      this.setState({ creating: false });
    }
  }

  render() {
    const { owners, creating } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? <CreateOwner onSaveDone={() => this.hideCreateOwner()} />
          : <OwnerList owners={owners} onCreateClicked={() => this.showCreateOwner()} />}
      </TWScreenWithNavigationBar>
    );
  }
}

export default OwnerScreen;
