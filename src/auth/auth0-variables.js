console.log("cb", (window.location.origin + '/callback'));

export const AUTH_CONFIG = {
  api_audience: 'https://lowsky.eu.auth0.com/api/v2/',
  domain: 'lowsky.eu.auth0.com',
  clientId: 'N9UJUBdCbClHC6zM7022I_m8GHJFXhFh',
  callbackUrl:
  (process.env.NODE_ENV === 'production') ? window.location.origin + '/callback' :
  window.location.origin + '/callback'
};
