import { createError } from 'apollo-errors';
import { getSession, getAccessToken } from '@auth0/nextjs-auth0';

import validateAndParseIdToken from '../helpers/validateAndParseIdToken';
import {
  injectUserIdByAuth0id,
  userIdByAuth0id,
} from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';

const NotAuthorizedError = 'NotAuthorizedError';

const AuthError = createError(NotAuthorizedError, {
  message: NotAuthorizedError,
});

export const RegistrationFailed = createError('RegistrationFailed', {
  message: 'RegistrationFailed',
});

const getUserId = async (ctx) => {
  const userToken = await verifyAuth0HeaderToken(ctx);
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

    const user = await createNewUser(userToken, ctx.prisma.user.create);
    if (isLocalDev) console.log('--- created prisma user (+id)', user);
    const { id } = user;
    if (id) injectUserIdByAuth0id(user.id, auth0id);
    return id;
  }

  throw new AuthError({
    message: 'Not authorized: no user in current request',
  });
};

export const auth0idFromUserToken = (userToken) => userToken?.sub.split('|')[1];

async function verifyAuth0HeaderToken(ctx) {
  try {
    const session = getSession(ctx.req, ctx.res);
    const userToken = session?.user;
    const auth0id = auth0idFromUserToken(userToken);
    if (auth0id) {
      return userToken;
    }
  } catch (error) {
    throw new Error(
      'Not authenticated or auth info in cookie invalid:' + error
    );
  }

  const authorization =
    ctx.request?.get('Authorization') ??
    ctx.event?.headers?.['authorization'] ??
    ctx.connection?.context?.Authorization ??
    undefined;

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      const userToken = await validateAndParseIdToken(token);
      const auth0id = auth0idFromUserToken(userToken);
      if (auth0id) {
        return userToken;
      }
    } catch (error) {
      throw new Error('invalid auth token was sent: ' + error);
    }
  }

  throw new AuthError({
    message: 'Not authorized, no valid auth token',
  });
}

const verifyUserIsAuthenticated = async (ctx) => {
  await verifyAuth0HeaderToken(ctx);
};

export { getUserId, verifyUserIsAuthenticated, verifyAuth0HeaderToken };
