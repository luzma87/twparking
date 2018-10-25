/* eslint-disable react/no-unused-state */
/* @flow */
import React, { Component } from 'react';
import MyContext from './MyContext';
import type { GlobalContext, User } from './types';

type Props = {
  children: any
};

class GlobalProvider extends Component<Props, GlobalContext> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        name: '',
      },
      updateUser: this.updateUser.bind(this),
    };
  }

  updateUser(user: User) {
    this.setState({ user }, () => {});
  }

  render() {
    const { children } = this.props;
    const state = {
      state: this.state,
    };
    return (
      <MyContext.Provider value={state}>
        {children}
      </MyContext.Provider>
    );
  }
}

export default GlobalProvider;
