import { gql } from "@apollo/client";

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      id
      name
      email
      avatarUrl
    }
  }
`;

export const signInOrCreateAccount = async (apolloClient, idToken) => {
  return apolloClient
    .mutate({
      mutation: AUTHENTICATE,
      variables: { idToken },
    })
    .then(res => {
      if (window.location.href.includes('localhost')) {
        console.log('authentication-mutation result:', res);
      }
      if (window.location.href.includes(`callback`)) {
        window.location.href = '/';
      }
    })
    .catch(err => console.error('Sign in or create account error: ', err));
};
