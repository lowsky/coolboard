import { clerkClient, getAuth, User } from '@clerk/nextjs/server';
import { GraphQLError } from 'graphql';

import { injectUserIdByAuth0id, userIdByAuth0id } from './userIdByAuth0id';
import { createNewUser } from './registerNewUser';
import { isLocalDev } from './logging';
import type { Ctxt } from '../resolvers/Context';

export type UserToken = {
  // Format: identity + '|' + userId
  sub: string;
  name?: string;
  email?: string;
  picture: string;
};

export const getUserId = async (ctx: Ctxt): Promise<string> => {
  const userToken: UserToken =
    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);
  if (userToken) {
    const auth0id = userToken.sub.split('|')[1];
    const userId = await userIdByAuth0id(auth0id, (auth0id) =>
      ctx.prisma.user.findUnique({
        where: {
          auth0id,
        },
      })
    );

    if (userId) {
      return userId;
    }

    if (userToken.email) {
      const userWithEmailExists = await ctx.prisma.user.findUnique({
        where: {
          email: userToken.email,
        },
      });
      if (userWithEmailExists) {
        throw new GraphQLError('User with this email already exists', {
          extensions: {
            code: 'REGISTRATION_FAILED_USER_ALREADY_EXISTS',
            coolboardExitingUser: userToken.email,
          },
        });
      }

      const user = await createNewUser(userToken, ctx.prisma.user.create);
      if (isLocalDev) console.log('--- created prisma user', user);

      const { id } = user;
      if (id) injectUserIdByAuth0id(user.id, auth0id);
      return id;
    }
  }

  throw new GraphQLError('Not authorized: no user in current request', {
    extensions: {
      code: 'NOTAUTHORIZED_BAD_REQUEST',
    },
  });
};

export const userTokenFromClerkSessionUserId = (
  user: User,
  identity = 'clerk'
): UserToken => {
  const email = user.primaryEmailAddressId;
  const name = user.username ?? user.firstName ?? user.lastName;
  const picture = user.imageUrl;
  const sub = identity + '|' + user.id;
  if (email) {
    return { name: name ?? email, email, sub, picture };
  }
  return { sub, picture };
};

/**
 * Extracts user-id from UserToken e.g. the auth0id from 'xxx|auth0id'
 */
export const verifyAndRetrieveAuthSubject = async (
  ctx: Ctxt
): Promise<string> => {
  const { userId } = getAuth(ctx.req);
  if (userId) {
    if (isLocalDev)
      console.log('verifyAndRetrieveAuthSubject: userid:', userId);
    return userId;
  }
  throw new GraphQLError('Not authorized, no valid auth token', {
    extensions: {
      code: 'NOT_AUTHORIZED',
    },
  });
};

export async function verifyUserIsAuthenticatedAndRetrieveUserToken(
  ctx: Ctxt
): Promise<UserToken> {
  const { userId } = getAuth(ctx.req);
  if (userId) {
    if (isLocalDev)
      console.log(
        'verifyUserIsAuthenticatedAndRetrieveUserToken: userid:',
        userId
      );

    const client = await clerkClient();
    const user: User = await client.users.getUser(userId);
    return userTokenFromClerkSessionUserId(user);
  }

  throw new GraphQLError('Not authorized, no valid auth token', {
    extensions: {
      code: 'NOT_AUTHORIZED',
    },
  });
}
