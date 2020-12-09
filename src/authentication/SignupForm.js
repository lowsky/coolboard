import React, { Component } from 'react';

import { gql, useMutation } from "@apollo/client";

import AuthForm from './AuthForm';
import PropTypes from 'prop-types';

class SignUpFormComponent extends Component {
  state = { errors: [] };

  onSubmit({ name, email, password, avatarUrl }) {
    const { mutate, successfulSignup } = this.props;

    mutate({
      variables: {
        name,
        email,
        password,
        avatarUrl,
      },
    })
      .then(() => {
        successfulSignup();
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(
          error => error.message
        );
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div data-cy="signup-form">
        <h1>Sign Up</h1>
        <AuthForm
          signUp
          onSubmit={formData =>
            this.onSubmit(formData)
          }
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
    $avatarUrl: String
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      avatarUrl: $avatarUrl
    ) {
      token
    }
  }
`;

export const SignupForm = ({ successfulLogin }) => {
  const [mutate] = useMutation(SIGNUP_MUTATION);
  return (
    <SignUpFormComponent
      mutate={mutate}
      successfulLogin={successfulLogin}
    />
  );
};

SignupForm.propTypes = {
  successfulLogin: PropTypes.func,
};
