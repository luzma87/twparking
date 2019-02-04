/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import type { Owner } from '../../../context/types';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import sortingHelper from '../../../util/sortingHelper';
import LoadingMessage from '../../_common/LoadingMessage';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import CreateParking from './parkingSpots/CreateParking';
import ParkingList from './parkingSpots/ParkingList';

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
  selectedOwner: ?Owner,
  creating: boolean,
  loading: boolean,
};
class ParkingScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      owners: [],
      selectedOwner: undefined,
      creating: false,
      loading: true,
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
        }, (error) => { console.warn('Parking error', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Parking';
    }
    return 'screens.admin.parking.create.title';
  }

  getContent() {
    const { owners, loading } = this.state;
    if (loading) {
      return <LoadingMessage type="parking" />;
    }
    return (
      <ParkingList
        owners={owners}
        onCreateClicked={owner => this.showCreateForm(owner)}
        onSaveDone={() => this.getData()}
      />
    );
  }

  showCreateForm(owner: ?Owner) {
    this.setState({ creating: true, selectedOwner: owner });
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
    const { creating, selectedOwner } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? <CreateParking owner={selectedOwner} onSaveDone={() => this.hideCreateForm()} />
          : this.getContent()}
      </TWScreenWithNavigationBar>
    );
  }
}

export default ParkingScreen;
