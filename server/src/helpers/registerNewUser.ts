import { GraphQLError } from 'graphql';
import type { User, Prisma } from '@prisma/client';

import { isLocalDev } from './logging';
import type { UserToken } from './auth';

/* Identity, auth0id, name, email, avatarUrl */
type PrismaUserCreator = (data: Prisma.UserCreateArgs) => Promise<User>;

export const createNewUser = async (
  userToken: UserToken,
  createPersistentUser: PrismaUserCreator
): Promise<User> => {
  const { sub, name, email, picture } = userToken;
  const auth0id = sub?.split(`|`)[1];
  const identity = sub?.split(`|`)[0];

  if (!email || !name || !auth0id) {
    throw new GraphQLError(
      `Error while signing in: Missing any of (email, name, auth0id). Plz contact support!`,
      {
        extensions: {
          code: 'REGISTRATION_FAILED_MISSING_DATA',
          coolboardAuthData: {
            email,
            name,
            auth0id,
          },
        },
      }
    );
  }

  const userData: Prisma.UserCreateArgs = {
    data: {
      identity: identity ?? null,
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

    if (err instanceof Error && err.message?.includes('unique constraint')) {
      throw new GraphQLError(
        `Error signing in, a user with same email ${email} already exist. Plz contact support!`,
        {
          extensions: {
            code: 'REGISTRATION_FAILED_USER_ALREADY_EXISTS',
            coolboardAuthError: err,
          },
        }
      );
    }

    throw err;
  }
};
