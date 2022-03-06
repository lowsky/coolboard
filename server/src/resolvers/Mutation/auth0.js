import validateAndParseIdToken from '../../helpers/validateAndParseIdToken';
import { createNewUser } from '../../helpers/registerNewUser';

// @deprecate
const auth0 = {
  async authenticate(parent, { idToken }, { prisma }) {
    let userToken;

    try {
      userToken = await validateAndParseIdToken(idToken);
      /*      id-JWT-Token

      containing header:

      {
        "typ": "JWT",
        "alg": "RS256",
        "kid": "MDM2MjdEQjg1QkI3NDRGNEFEQjE3OEIxOUI1RUJDMTJGNkE2Mxxxx"
      }

      containing payload:

      {
        "iss": "https://lowsky.eu.auth0.com/",
        "sub": "google-oauth2|116153478474242769xxx",
        "aud": [
          "https://lowsky.eu.auth0.com/api/v2/",
          "https://lowsky.eu.auth0.com/userinfo"
        ],
        "iat": 1528636640,
        "exp": 1528643840,
        "azp": "N9UJUBdCbClHC6zM7022I_m8GHJFXxxx",
        "scope": "openid profile email"
      }

       */
    } catch (err) {
      throw new Error(`Auth0: validating token: ${idToken} - ${err.message}`);
    }

    const auth0id = userToken.sub.split('|')[1];

    if (!auth0id) {
      throw new Error('auth0id is empty, invalid token !');
    }

    let userByAuth0id = await prisma.user({ auth0id });

    if (userByAuth0id) {
      return userByAuth0id;
    }

    return createNewUser(userToken, prisma.createUser);
  },
};

export default auth0;
