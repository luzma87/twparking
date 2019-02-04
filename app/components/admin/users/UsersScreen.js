/* @flow */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import type { User } from '../../../context/types';
import navigationHeader from '../../../navigation/NavigationStylesHelper';
import sortingHelper from '../../../util/sortingHelper';
import LoadingMessage from '../../_common/LoadingMessage';
import TWScreenWithNavigationBar from '../../_common/TWScreenWithNavigationBar';
import CreateUser from './user/CreateUser';
import UserList from './user/UserList';

const userArrayFromObject = (users) => {
  const usersArray = [];
  Object.keys(users).forEach((userKey) => {
    const owner = {
      id: userKey,
      ...users[userKey],
    };
    usersArray.push(owner);
  });
  usersArray.sort(sortingHelper.compareByName);
  return usersArray;
};

type Props = {
  navigation: any
};
type State = {
  users: any,
  creating: boolean,
  loading: boolean,
  selectedUser: User
};

class UsersScreen extends Component<Props, State> {
  static navigationOptions = navigationHeader.noHeader;

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      creating: false,
      loading: true,
      selectedUser: null,
    };
    this.getData();
  }

  getData() {
    firebase.auth().onAuthStateChanged(() => {
      firebase.database()
        .ref('people')
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            const users = snapshot.val();
            this.setState({ users: userArrayFromObject(users), loading: false });
          }
        }, (error) => { console.warn('User error', error); });
    });
  }

  getTitle() {
    const { creating } = this.state;
    if (!creating) {
      return 'screens.admin.home.tabs.Users';
    }
    return 'screens.admin.users.create.title';
  }

  getContent() {
    const { users, loading } = this.state;
    if (loading) {
      return <LoadingMessage type="users" />;
    }
    return (
      <UserList
        users={users}
        onCreateClicked={() => this.showCreateForm()}
        onEditClicked={user => this.showEditForm(user)}
        onSaveDone={() => this.getData()}
      />
    );
  }

  showCreateForm() {
    this.setState({ creating: true });
  }

  showEditForm(user) {
    this.setState({ creating: true, selectedUser: user });
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
    const { creating, selectedUser } = this.state;
    return (
      <TWScreenWithNavigationBar
        onPress={() => this.goBack()}
        i18nTitle={this.getTitle()}
      >
        {creating
          ? <CreateUser onSaveDone={() => this.hideCreateForm()} selectedUser={selectedUser} />
          : this.getContent()}
      </TWScreenWithNavigationBar>
    );
  }
}

export default UsersScreen;
