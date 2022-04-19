import { AuthenticationError } from 'apollo-server-errors';

import { User } from '@prisma/client';
import auth0 from '../../../src/auth0';
import validateAndParseIdToken from '../helpers/validateAndParseIdToken';
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

    // @ts-expect-error needs small adaption
    const user: User = await createNewUser(userToken, ctx.prisma.user.create);
    if (isLocalDev) console.log('--- created prisma user (+id)', user);
    const { id } = user;
    if (id) injectUserIdByAuth0id(user.id, auth0id);
    return id;
  }

  throw new AuthenticationError('Not authorized: no user in current request');
};

/**
 * Extracts auth0 from second part of the sub ('xxx|auth0id')
 */
const auth0idFromUserToken = (userToken: { sub: string }) =>
  userToken && userToken.sub?.split('|')[1];

type UserToken = {
  sub: string;
};

/**
 * Extracts auth0 from second part of the sub ('xxx|auth0id')
 */
export const verifyAndRetrieveAuth0HeaderToken = async (ctx: Ctxt) => {
  const userToken = await verifyAuth0HeaderToken(ctx);
  return userToken?.sub.split('|')[1];
};

async function verifyAuth0HeaderToken(ctx: Ctxt): Promise<UserToken> {
  try {
    const session = auth0.getSession(ctx.req, ctx.res);
    const userToken = session?.user as UserToken;
    if (userToken) {
      const auth0id = auth0idFromUserToken(userToken);
      if (auth0id) {
        return userToken;
      }
    }
  } catch (error) {
    throw new Error(
      'Not authenticated or auth info in cookie invalid:' + error
    );
  }

  const authorization = ctx.req?.get?.('Authorization') ?? undefined;

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      const userToken = (await validateAndParseIdToken(token)) as UserToken;
      const auth0id = auth0idFromUserToken(userToken);
      if (auth0id) {
        return userToken as UserToken;
      }
    } catch (error) {
      throw new Error('invalid auth token was sent: ' + error);
    }
  }

  throw new AuthenticationError('Not authorized, no valid auth token');
}

const verifyUserIsAuthenticated = async (ctx: Ctxt) => {
  await verifyAuth0HeaderToken(ctx);
};

export { verifyUserIsAuthenticated, verifyAuth0HeaderToken };
