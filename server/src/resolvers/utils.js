const { createError } = require('apollo-errors');

const validateAndParseIdToken = require('../helpers/validateAndParseIdToken');

const NotAuthorizedError = 'NotAuthorizedError';

const AuthError = createError(NotAuthorizedError, {
  message: NotAuthorizedError,
});

const getUserId = async ctx => {
  const auth0id = await verifyAuth0HeaderToken(ctx);

  if (auth0id) {
    const userByAuth0id = await ctx.db.query.user({
      where: { auth0id },
    });
    if (userByAuth0id) {
      return userByAuth0id.id;
    }
  }

  if (ctx.request) {
    const user = ctx.request.user;
    if (user) {
      return user.id;
    }
  }

  throw new AuthError({
    message:
      'Not authorized: no user in current request',
  });
};

async function verifyAuth0HeaderToken(ctx) {
  const Authorization = ctx.request
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

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    try {
      const userToken = await validateAndParseIdToken(
        token
      );
      const auth0id = userToken.sub.split('|')[1];
      if (auth0id) {
        return auth0id;
      }
    } catch (error) {
      throw new Error(
        'invalid auth token was sent: ' + error
      );
    }
  }

  throw new AuthError({
    message: 'Not authorized',
  });
}

const verifyUserIsAuthenticated = async ctx => {
  const auth0id = await verifyAuth0HeaderToken(ctx);
  if (auth0id) {
    return true;
  }
  throw new AuthError({
    message:
      'Not authorized: no user in current request',
  });
};

module.exports = {
  getUserId,
  verifyUserIsAuthenticated,
  verifyAuth0HeaderToken,
  AuthError,
  NotAuthorizedError,
};
