import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

class Auth0Callback extends Component {
  render() {
    return (
      <div>
        <Loader active>Authenticating...</Loader>
      </div>
    );
  }
}

export default Auth0Callback;
