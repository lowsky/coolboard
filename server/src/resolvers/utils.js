import { createError } from 'apollo-errors';

import validateAndParseIdToken from '../helpers/validateAndParseIdToken';
import { injectUserIdByAuth0id, userIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';

const NotAuthorizedError = 'NotAuthorizedError';

const AuthError = createError(NotAuthorizedError, {
  message: NotAuthorizedError,
});

export const RegistrationFailed = createError('RegistrationFailed', {
  message: 'RegistrationFailed',
});

const getUserId = async ctx => {

  const userToken = await verifyAuth0HeaderToken(ctx);
  if (userToken) {

    const auth0id = userToken.sub.split('|')[1];
    const userId = await userIdByAuth0id(ctx.db, auth0id);
    if (userId) {
      return userId;
    }

    const user = await createNewUser(ctx.db, userToken);
    if (isLocalDev) console.log('--- created prisma user (+id)', user);
    const { id } = user;
    if (id) injectUserIdByAuth0id(user.id, auth0id)
    return id;
  }

  throw new AuthError({
    message:
      'Not authorized: no user in current request',
  });
};

async function verifyAuth0HeaderToken(ctx) {
  const authorization = ctx.request
    ? ctx.request.get('Authorization')
    : ctx.event &&
      ctx.event.headers &&
      ctx.event.headers['authorization']
    ? ctx.event.headers['authorization']
    : ctx.connection &&
      ctx.connection.context &&
      ctx.connection.context.Authorization
    ? ctx.connection.context.Authorization
    : undefined;

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      const userToken = await validateAndParseIdToken(
        token
      );
      const auth0id = userToken.sub.split('|')[1];
      if (auth0id) {
        return userToken;
      }
    } catch (error) {
      throw new Error(
        'invalid auth token was sent: ' + error
      );
    }
  }

  throw new AuthError({
    message: 'Not authorized or invalid auth token',
  });
}

const verifyUserIsAuthenticated = async ctx => {
  await verifyAuth0HeaderToken(ctx);
};

export {
  getUserId,
  verifyUserIsAuthenticated,
  verifyAuth0HeaderToken,
};
