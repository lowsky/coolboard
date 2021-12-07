import { RegistrationFailed } from '../resolvers/utils';
import { isLocalDev } from './logging';

export const createNewUser = async (idToken, createPersistentUser) => {
  const data = {
    identity: idToken.sub.split(`|`)[0],
    auth0id: idToken.sub.split(`|`)[1],
    name: idToken.name,
    email: idToken.email,
    avatarUrl: idToken.picture,
  };

  if (!data.email || !data.name || !data.auth0id) {
    throw new RegistrationFailed({
      data: {
        message:
          `Error while signing in: Missing any of (email, name, auth0id). Plz contact support!`,
      },
      internalData: {
        email: data.email,
        name: data.name,
        auth0id: data.auth0id,
      },
    });
  }

  try {
    return createPersistentUser({ data });
  } catch (err) {
    if (isLocalDev) console.error('Failed to create this new user:', data, err);

    if(err.message.includes('unique constraint')) {
      throw new RegistrationFailed({
        data: {
          message:
            `Error signing in, a user with same email ${data.email} already exist. Plz contact support!`
        },
        internalData: {
          error: err
        }
      })
    }
    throw err;
  }
};
