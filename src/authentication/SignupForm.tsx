import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';

import AuthForm, { FormData } from './AuthForm';

const SignUpFormComponent = (props) => {
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = ({ name, email, password, avatarUrl }: FormData) => {
    const { mutate, successfulSignup } = props;

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
      .catch((res) => {
        setErrors(res.graphQLErrors.map((error) => error.message));
      });
  };

  return (
    <div data-cy="signup-form">
      <h1>Sign Up</h1>
      <AuthForm
        onSubmit={(formData: FormData) => onSubmit(formData)}
        errors={errors}
        signUp
      />
    </div>
  );
};

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
    <SignUpFormComponent mutate={mutate} successfulLogin={successfulLogin} />
  );
};

SignupForm.propTypes = {
  successfulLogin: PropTypes.func,
};
