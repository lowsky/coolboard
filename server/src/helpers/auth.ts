import clerk, { User as ClerkUser } from '@clerk/clerk-sdk-node';
import { getAuth } from '@clerk/nextjs/server';
import { AuthenticationError } from 'apollo-server-errors';

import { injectUserIdByAuth0id, userIdByAuth0id } from './userIdByAuth0id';
import { createNewUser } from './registerNewUser';
import { isLocalDev } from './logging';
import { Ctxt } from '../resolvers/Context';

export const getUserId = async (ctx: Ctxt): Promise<string> => {
  const userToken = await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);
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
        throw new AuthenticationError('User with this email already exists');
      }

      const user = await createNewUser(userToken, ctx.prisma.user.create);
      if (isLocalDev) console.log('--- created prisma user', user);

      const { id } = user;
      if (id) injectUserIdByAuth0id(user.id, auth0id);
      return id;
    }
  }

  throw new AuthenticationError('Not authorized: no user in current request');
};

export const userTokenFromClerkSessionUserId = (
  user: ClerkUser,
  identity = 'clerk'
): UserToken => {
  const email = user.emailAddresses.find(Boolean)?.emailAddress ?? undefined;
  const picture = user.profileImageUrl ?? undefined;
  const sub = identity + '|' + user.id;
  if (email) {
    return { name: email, email, sub, picture };
  }
  return { sub, picture };
};

type UserToken = {
  // format: identity + '|' + userId
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
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
    // not really needed: const user = (await clerk.users.getUser(userId));
    return userId;
  }
  throw new AuthenticationError('Not authorized, no valid auth token');
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

    return userTokenFromClerkSessionUserId(await clerk.users.getUser(userId));
  }

  throw new AuthenticationError('Not authorized, no valid auth token');
}
