/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import ParkingList from './parkingSpots/ParkingList';
import CreateParking from './parkingSpots/CreateParking';

const compareOwners = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const ownerArrayFromObject = (owners) => {
  const ownersArray = [];
  Object.keys(owners).forEach((ownerKey) => {
    const owner = {
      id: ownerKey,
      ...owners[ownerKey],
    };
    ownersArray.push(owner);
  });
  ownersArray.sort(compareOwners);
  return ownersArray;
};

type Props = {
  navigation: any
};
type State = {
  owners: any,
  selectedOwner: ?Owner,
  creating: boolean
};
class ParkingScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      owners: [],
      selectedOwner: undefined,
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
            const owners = snapshot.val();
            this.setState({ owners: ownerArrayFromObject(owners) });
          }
        }, (error) => { console.warn('??', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Parking';
    }
    return 'screens.admin.parking.create.title';
  }

  showCreateOwner(owner: Owner) {
    this.setState({ creating: true, selectedOwner: owner });
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
    const { owners, creating, selectedOwner } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? <CreateParking owner={selectedOwner} onSaveDone={() => this.hideCreateOwner()} />
          : <ParkingList owners={owners} onCreateClicked={owner => this.showCreateOwner(owner)} />}
      </TWScreenWithNavigationBar>
    );
  }
}

export default ParkingScreen;
