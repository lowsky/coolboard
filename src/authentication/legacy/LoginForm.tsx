import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import AuthForm, { FormData } from './AuthForm';

interface Props {
  mutate: ({
    variables: FormData,
  }) => Promise<{ data?: { login: { token: string } } | null | undefined }>;
  successfulLogin: (token: string) => void;
}

const LoginFormComponent = (props: Props) => {
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = (formData: FormData) => {
    const { mutate, successfulLogin } = props;

    try {
      mutate({
        variables: formData,
      })
        .then(({ data }) => {
          successfulLogin(data?.login.token ?? 'invalid token');
        })

        .catch((res) => {
          const errors = res.graphQLErrors.map((error) => error.message);

          console.error('login failed', res);

          setErrors(errors);
        });
    } catch (ex) {
      const message = typeof ex === 'object' ? ex?.['message'] : String(ex);
      const errors = [`Login unsuccessful! Details: ${message}`];

      setErrors(errors);
    }
  };

  return (
    <div data-cy="login-form">
      <h1>Login</h1>
      <AuthForm
        onSubmit={(formData: FormData) => onSubmit(formData)}
        errors={errors}
      />
    </div>
  );
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const LoginForm = ({ successfulLogin }) => {
  const [mutate] = useMutation<{ login: { token: string } }>(LOGIN_MUTATION);
  return (
    <LoginFormComponent mutate={mutate} successfulLogin={successfulLogin} />
  );
};
