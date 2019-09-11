import Auth0Lock from 'auth0-lock';
import gql from 'graphql-tag';
import { AUTH_CONFIG } from './auth0-variables';

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

class Auth {
  lock = new Auth0Lock(
    AUTH_CONFIG.clientId,
    AUTH_CONFIG.domain,
    {
      oidcConformant: true,
      autoclose: true,
      rememberLastLogin: true,
      allowForgotPassword: true,
      allowAutocomplete: true,
      allowShowPassword: true,
      allowPasswordAutocomplete: true,
      auth: {
        sso: false,
        redirectUrl: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
        audience: `${AUTH_CONFIG.api_audience}`,
        params: {
          scope: `openid profile email user_metadata app_metadata picture`,
        },
      },
    }
  );

  constructor(apolloClient) {
    this.apolloClient = apolloClient;

    this.addHandleAuthenticationListener();
  }

  login = () => {
    this.lock.show();
  };

  addHandleAuthenticationListener() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on(
      'authenticated',
      this.setSession.bind(this)
    );

    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', err => {
      console.error(
        'Error while authentication via auth0',
        err
      );
      alert(
        `Sorry, Error: ${err.error}. Check the console for further details, and Please Re-try.`
      );
    });
  }

  setSession(authResult) {
    if (
      authResult &&
      authResult.accessToken &&
      authResult.idToken
    ) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 +
          new Date().getTime()
      );
      localStorage.setItem(
        'access_token',
        authResult.accessToken
      );
      localStorage.setItem(
        'id_token',
        authResult.idToken
      );
      localStorage.setItem('expires_at', expiresAt);
    }
  }

  async signinOrCreateAccount(idToken) {
    return this.apolloClient
      .mutate({
        mutation: AUTHENTICATE,
        variables: { idToken },
      })
      .then(res => {
        if (
          window.location.href.includes('localhost')
        ) {
          console.log(
            'authentication-mutation result:',
            res
          );
        }
        if (
          window.location.href.includes(`callback`)
        ) {
          window.location.href = '/';
        }
      })
      .catch(err =>
        console.error(
          'Sign in or create account error: ',
          err
        )
      );
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  refresh = () => {
    this.lock.checkSession({}, (err, ar) => {
      if (err) {
        console.error(
          'error, while refreshing auth0 tokens.',
          err
        );
      } else this.setSession(ar);
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(
      localStorage.getItem('expires_at')
    );
    const isNotExpired =
      new Date().getTime() < expiresAt;

    if (window.location.href.includes('localhost')) {
      console.log(
        `AUTH: is expired? - ${!isNotExpired}`
      );
    }
    return isNotExpired;
  };
}

export default Auth;
