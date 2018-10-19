import React from 'react';
import GlobalContext from './MyContext';

export function withContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <GlobalContext.Consumer>
        {context => <Component {...props} context={context.state} />}
      </GlobalContext.Consumer>
    );
  };
}
