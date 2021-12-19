import Auth0Lock from 'auth0-lock';

import { AUTH_CONFIG } from './auth0-variables';
import { signInOrCreateAccount } from './signInOrCreateAccount';

function saveInLocalStore(authResult) {
  // Set the time that the access token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem(
    'access_token',
    authResult.accessToken
  );
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
}

class Auth {

  lock: Auth0Lock | undefined;

  constructor() {
    if (typeof window !== "undefined") {
      this.lock = new Auth0Lock(
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
          avatar: null,
          auth: {
            sso: false,
            redirectUrl: AUTH_CONFIG.callbackUrl,
            responseType: 'token id_token',
            audience: `${AUTH_CONFIG.api_audience}`,
            params: {
              scope: `openid profile email picture`,
            },
          },
        }
      );
      this.addHandleAuthenticationListener();
    }
  }

  login = () => {
    this.lock?.show?.();
  };

  addHandleAuthenticationListener() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession);

    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', err => {
      console.error('Error while authentication via auth0', err);
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
      saveInLocalStore(authResult);

      if (window.location.href.includes(`callback`)) {
        window.location.href = '/boards';
      }
    }
  }

  async signinOrCreateAccount(apolloClient, idToken) {
    return signInOrCreateAccount(
      apolloClient,
      idToken
    );
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.lock.logout();
  };

  refresh = async () => {
    return new Promise((resolve, reject) => {
      this.lock.checkSession({}, (err, authResult) => {
        if (err) {
          console.error(
            'error, while refreshing auth0 tokens.',
            err
          );
          reject(err);
        } else {
          this.setSession(authResult);
          resolve(null);
        }
      });
    });
  };
}

export default Auth;
