import { AuthenticationError } from 'apollo-server-errors';
import { isLocalDev } from './logging';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';

export const createNewUser = async (
  idToken: JwtPayload,
  createPersistentUser: ({
    data: { identity, auth0id, name, email, avatarUrl },
  }: {
    data: {
      auth0id: string;
      name: string;
      email: string;
      identity?: string;
      avatarUrl?: string | undefined;
    };
  }) => User
) => {
  const data = {
    identity: idToken.sub?.split(`|`)[0],
    auth0id: idToken.sub?.split(`|`)[1],
    name: idToken.name,
    email: idToken.email ?? idToken.name,
    avatarUrl: idToken.picture,
  } as const;

  if (!data.email || !data.name || !data.auth0id) {
    throw new AuthenticationError(
      `Error while signing in: Missing any of (email, name, auth0id). Plz contact support!`,
      {
        internalData: {
          email: data.email,
          name: data.name,
          auth0id: data.auth0id,
        },
      }
    );
  }

  try {
    // @ts-expect-error not exactly matching: identity is optional
    return createPersistentUser({ data });
  } catch (err) {
    if (isLocalDev) console.error('Failed to create this new user:', data, err);

    // @ts-expect-error err of unknown type
    if (err?.message?.includes('unique constraint')) {
      throw new AuthenticationError(
        `Error signing in, a user with same email ${data.email} already exist. Plz contact support!`,
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
