const jwt = require('jsonwebtoken');

const { createError } = require('apollo-errors');

const NotAuthorizedError = 'NotAuthorizedError';

const AuthError = createError(NotAuthorizedError, {
  message: NotAuthorizedError,
});

function getUserId(ctx) {
  console.log('CTX: event.headers', Object.keys(ctx.event.headers));

  const Authorization = ctx.request
    ? ctx.request.get('Authorization')
    : (
      ctx.event.headers && ctx.event.headers['authorization'] ?
        ctx.event.headers['authorization']
        : ctx.connection.context.Authorization);


  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(
      token,
      process.env.APP_SECRET
    );
    return userId;
  }

  throw new AuthError({
    message: 'Not authorized',
  });
}

module.exports = {
  getUserId,
  AuthError,
  NotAuthorizedError,
};
