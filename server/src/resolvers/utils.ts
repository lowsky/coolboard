import clerk from '@clerk/clerk-sdk-node';
import { User as ClerkUser } from '@clerk/clerk-sdk-node';
import { AuthenticationError } from 'apollo-server-errors';

import { User } from '@prisma/client';

import {
  injectUserIdByAuth0id,
  userIdByAuth0id,
} from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';
import { Ctxt } from './Context';

// only used below...
// @ts-ignore
export const getUserId = async (ctx: Ctxt) => {
  const userToken = await verifyAuth0HeaderToken(ctx);
  if (userToken) {
    const auth0id = userToken.sub.split('|')[1];
    const userId = await userIdByAuth0id(auth0id, (auth0id: string) =>
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

      const user: User = await createNewUser(userToken, ctx.prisma.user.create);
      if (isLocalDev) console.log('--- created prisma user (+id)', user);
      const { id } = user;
      if (id) injectUserIdByAuth0id(user.id, auth0id);
      return id;
    }
  }

  throw new AuthenticationError('Not authorized: no user in current request');
};

export const userTokenFromClerkSessionUserId = (user: ClerkUser): UserToken => {
  let email = user.emailAddresses.find(Boolean)?.emailAddress ?? undefined;
  return {
    email: email,
    name: email,
    sub: 'xxx|' + user.id,
    picture: user.profileImageUrl ?? undefined,
  };
};

type UserToken = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

/**
 * Extracts auth0 from second part of the sub ('xxx|auth0id')
 */
export const verifyAndRetrieveAuth0HeaderToken = async (ctx: Ctxt) => {
  const userToken = await verifyAuth0HeaderToken(ctx);
  return userToken?.sub.split('|')[1];
};

async function verifyAuth0HeaderToken(ctx: Ctxt): Promise<UserToken> {
  if (ctx.req?.auth?.userId) {
    console.log(
      'verifyAuth0HeaderToken: Session, userid:',
      ctx.req?.auth.userId
    );

    return userTokenFromClerkSessionUserId(
      await clerk.users.getUser(ctx.req?.auth.userId)
    );
  }

  throw new AuthenticationError('Not authorized, no valid auth token');
}

const verifyUserIsAuthenticated = async (ctx: Ctxt) => {
  await verifyAuth0HeaderToken(ctx);
};

export { verifyUserIsAuthenticated, verifyAuth0HeaderToken };
