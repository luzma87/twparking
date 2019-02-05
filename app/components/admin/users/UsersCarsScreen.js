/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import type { Owner } from '../../../context/types';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import sortingHelper from '../../../util/sortingHelper';
import LoadingMessage from '../../_common/LoadingMessage';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import CreateCar from './userCar/CreateCar';
import UserCarList from './userCar/UserCarList';

const peopleArrayFromObject = (people) => {
  const peopleArray = [];
  Object.keys(people).forEach((personKey) => {
    const person = {
      id: personKey,
      ...people[personKey],
    };
    peopleArray.push(person);
  });
  peopleArray.sort(sortingHelper.compareByName);
  return peopleArray;
};

type Props = {
  navigation: any
};
type State = {
  people: any,
  selectedOwner: ?Owner,
  creating: boolean,
  loading: boolean,
};
class UsersCarsScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      people: [],
      selectedOwner: undefined,
      creating: false,
      loading: true,
    };
    this.getData();
  }

  getData() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('people')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const people = snapshot.val();
            this.setState({ people: peopleArrayFromObject(people), loading: false });
          }
        }, (error) => { console.warn('People + car error', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Cars';
    }
    return 'screens.admin.cars.create.title';
  }

  getContent() {
    const { people, loading } = this.state;
    if (loading) {
      return <LoadingMessage type="cars" />;
    }
    return (
      <UserCarList
        people={people}
        onCreateClicked={person => this.showCreateForm(person)}
        onSaveDone={() => this.getData()}
      />
    );
  }

  showCreateForm(person: ?Owner) {
    this.setState({ creating: true, selectedOwner: person });
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
          ? <CreateCar person={selectedOwner} onSaveDone={() => this.hideCreateForm()} />
          : this.getContent()}
      </TWScreenWithNavigationBar>
    );
  }
}

export default UsersCarsScreen;
