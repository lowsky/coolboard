import { AuthenticationError } from 'apollo-server-errors';
import { JwtPayload } from 'jsonwebtoken';
import { User, Prisma } from '@prisma/client';

import { isLocalDev } from './logging';

/* identity, auth0id, name, email, avatarUrl */
type PrismaUserCreator = (data: Prisma.UserCreateArgs) => Promise<User>;

export const createNewUser = async (
  idToken: JwtPayload,
  createPersistentUser: PrismaUserCreator
): Promise<User> => {
  const { sub, name, email, picture } = idToken;
  const auth0id = sub?.split(`|`)[1];
  const identity = sub?.split(`|`)[0];

  if (!email || !name || !auth0id) {
    throw new AuthenticationError(
      `Error while signing in: Missing any of (email, name, auth0id). Plz contact support!`,
      {
        internalData: {
          email: email,
          name: name,
          auth0id: auth0id,
        },
      }
    );
  }

  const userData: Prisma.UserCreateArgs = {
    data: {
      identity,
      auth0id,
      name,
      email: email ?? name,
      avatarUrl: picture,
    },
  };
  try {
    return await createPersistentUser(userData);
  } catch (err) {
    if (isLocalDev)
      console.error('Failed to create this new user:', userData, err);

    // @ts-expect-error err of unknown type
    if (err?.message?.includes('unique constraint')) {
      throw new AuthenticationError(
        `Error signing in, a user with same email ${email} already exist. Plz contact support!`,
        {
          internalData: {
            error: err,
          },
        }
      );
    }
    throw err;
  }
};
