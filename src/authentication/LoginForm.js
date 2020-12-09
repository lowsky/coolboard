import React, { Component } from 'react';

import { gql, useMutation } from "@apollo/client";

import AuthForm from './AuthForm';
import PropTypes from 'prop-types';

class LoginFormComponent extends Component {
  state = { errors: [] };

  onSubmit(formData) {
    const { mutate, successfulLogin } = this.props;

    try {
      mutate({
        variables: formData,
      })
        .then(({ data }) => {
          const {
            login: { token },
          } = data;

          successfulLogin(token);
        })

        .catch(res => {
          const errors = res.graphQLErrors.map(
            error => error.message
          );

          console.error('login failed', res);

          this.setState({ errors });
        });
    } catch (ex) {
      const errors = [
        `Login unsuccessful! Details: ${ex.message}`,
      ];

      this.setState({ errors });
    }
  }

  render() {
    return (
      <div data-cy="login-form">
        <h1>Login</h1>
        <AuthForm
          onSubmit={formData =>
            this.onSubmit(formData)
          }
          errors={this.state.errors}
        />
      </div>
    );
  }
}

LoginFormComponent.propTypes = {
  successfulLogin: PropTypes.func,
  mutate: PropTypes.func,
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const LoginForm = ({ successfulLogin }) => {
  const [mutate] = useMutation(LOGIN_MUTATION);
  return (
    <LoginFormComponent
      mutate={mutate}
      successfulLogin={successfulLogin}
    />
  );
};



LoginForm.propTypes = {
  successfulLogin: PropTypes.func,
};
