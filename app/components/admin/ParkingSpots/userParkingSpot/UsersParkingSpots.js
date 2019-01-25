/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import navigationHeader from '../../../../navigation/NavigationStylesHelper';
import TWScreenWithNavigationBar from '../../../_common/TWScreenWithNavigationBar';
import CreateParkingSpot from './CreateParkingSpot';
import UserParkingSpotsList from './UserParkingSpotsList';

const compareOwners = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const spotsArrayFromObject = (owners) => {
  let spotsArray = [];
  Object.keys(owners).forEach((ownerKey) => {
    const owner = owners[ownerKey];
    const { parkingSpots } = owner;
    // console.warn(owner.name, parkingSpots, parkingSpots.length);
    if (parkingSpots && parkingSpots.length > 0) {
      spotsArray = [...spotsArray, ...parkingSpots];
    }
  });
  // console.warn('-->', spotsArray.length);
  return spotsArray.map((spot) => {
    const label = `${spot.building} [${spot.number}]`;
    return {
      ...spot,
      label,
      value: spot,
    };
  });
};

const peopleArrayFromObject = (people) => {
  const peopleWithSpotArray = [];
  const peopleNoSpotArray = [];
  Object.keys(people).forEach((personKey) => {
    const person = {
      id: personKey,
      ...people[personKey],
    };
    if (person.spot) {
      peopleWithSpotArray.push(person);
    } else {
      peopleNoSpotArray.push(person);
    }
  });
  peopleNoSpotArray.sort(compareOwners);
  peopleWithSpotArray.sort(compareOwners);

  const newPeopleNoSpotArray = peopleNoSpotArray.map(person => ({
    ...person,
    label: person.name,
    value: person,
  }));

  const newPeopleWithSpotArray = peopleWithSpotArray.map(person => ({
    ...person,
    label: person.name,
    value: person.id,
  }));

  return { peopleWithSpot: newPeopleWithSpotArray, peopleNoSpot: newPeopleNoSpotArray };
};

type Props = {
  navigation: any
};

type State = {
  spotsWithPerson: any,
  spotsNoPerson: any,
  peopleWithSpot: any,
  peopleNoSpot: any,
  creating: boolean
};

class UsersParkingSpots extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      creating: false,
      spotsWithPerson: [],
      spotsNoPerson: [],
      peopleWithSpot: [],
      peopleNoSpot: [],
    };
    this.getData();
  }

  getData() {
    this.getSpots();
  }

  getSpots() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('owners')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const owners = snapshot.val();
            this.setState({ spotsWithPerson: spotsArrayFromObject(owners) }, () => {
              this.getPeople();
            });
          }
        }, (error) => { console.warn('UserParkingSpots error - owners', error); });
    });
  }

  getPeople() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('people')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const people = snapshot.val();
            this.setState(peopleArrayFromObject(people), () => {
              this.sortSpots();
            });
          }
        }, (error) => { console.warn('UserParkingSpots error - people', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Assignments';
    }
    return 'screens.admin.assignments.create.title';
  }

  sortSpots() {
    const { spotsWithPerson, peopleWithSpot } = this.state;
    const newSpotsWithPerson = [];
    const newSpotsNoPerson = [];
    const peoplesSpots = peopleWithSpot.map(person => person.spot);
    spotsWithPerson.forEach((spot) => {
      peoplesSpots.forEach((ps) => {
        if (ps.building === spot.building && ps.number === spot.number) {
          newSpotsWithPerson.push(spot);
        } else {
          newSpotsNoPerson.push(spot);
        }
      });
    });

    this.setState({
      spotsWithPerson: newSpotsWithPerson,
      spotsNoPerson: newSpotsNoPerson,
    });
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

  showCreateParkingSpot() {
    this.setState({ creating: true });
  }

  hideCreateParkingSpot() {
    this.getData();
    this.setState({ creating: false });
  }

  render() {
    const { creating, peopleNoSpot, spotsNoPerson } = this.state;
    const owners = [];
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? (
            <CreateParkingSpot
              peopleNoSpot={peopleNoSpot}
              spotsNoPerson={spotsNoPerson}
              onSaveDone={() => this.hideCreateParkingSpot()}
            />
          )
          : (
            <UserParkingSpotsList
              owners={owners}
              onCreateClicked={() => this.showCreateParkingSpot()}
            />
          )}
      </TWScreenWithNavigationBar>
    );
  }
}

export default UsersParkingSpots;
