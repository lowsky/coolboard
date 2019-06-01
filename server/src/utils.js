const { createError } = require('apollo-errors');

const validateAndParseIdToken = require('./helpers/validateAndParseIdToken');

const NotAuthorizedError = 'NotAuthorizedError';

const AuthError = createError(NotAuthorizedError, {
  message: NotAuthorizedError,
});

function getUserId(ctx) {

  verifyAuth0HeaderToken(ctx);

  if(ctx.request) {
    const user = ctx.request.user;
    if (user) {
      return user.id;
    }
  }

  throw new AuthError({
    message:
      'Not authorized: no user in current request',
  });
}

async function verifyAuth0HeaderToken(ctx) {

  const Authorization = ctx.request
    ? ctx.request.get('Authorization')
    : (
      ctx.event.headers && ctx.event.headers['authorization'] ?
        ctx.event.headers['authorization']
        : ctx.connection.context.Authorization);

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    try {
      await validateAndParseIdToken(token);
      return;

    } catch (err) {
      throw new Error(
        `utils: validating token: ${token} - ${
          err.message
        }`
    );
    }
  }

  throw new AuthError({
    message: 'Not authorized',
  });
}

module.exports = {
  getUserId,
  verifyAuth0HeaderToken,
  AuthError,
  NotAuthorizedError,
};
