/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import sortingHelper from '../../../util/sortingHelper';
import LoadingMessage from '../../_common/LoadingMessage';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import CreateOwner from './owners/CreateOwner';
import OwnerList from './owners/OwnerList';

const ownerArrayFromObject = (owners) => {
  const ownersArray = [];
  Object.keys(owners).forEach((ownerKey) => {
    const owner = {
      id: ownerKey,
      ...owners[ownerKey],
    };
    ownersArray.push(owner);
  });
  ownersArray.sort(sortingHelper.compareByName);
  return ownersArray;
};

type Props = {
  navigation: any
};
type State = {
  owners: any,
  loading: boolean,
  creating: boolean
};

class OwnerScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      owners: [],
      loading: true,
      creating: false,
    };
    this.getData();
  }

  getData() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('owners')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const owners = snapshot.val();
            this.setState({ owners: ownerArrayFromObject(owners), loading: false });
          }
        }, (error) => { console.warn('Owner error', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Owners';
    }
    return 'screens.admin.owners.create.title';
  }

  getContent() {
    const { owners, loading } = this.state;
    if (loading) {
      return <LoadingMessage type="owners" />;
    }
    return <OwnerList owners={owners} onCreateClicked={() => this.showCreateForm()} />;
  }

  showCreateForm() {
    this.setState({ creating: true });
  }

  hideCreateForm() {
    this.getData();
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
    const { creating } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? <CreateOwner onSaveDone={() => this.hideCreateForm()} />
          : this.getContent()}
      </TWScreenWithNavigationBar>
    );
  }
}

export default OwnerScreen;
