const { getUserId } = require('../utils');

var debug = require('debug');
var error = debug('Query:error');

const Query = {
  async board(parent, { where }, ctx, info) {
    await getUserId(ctx);
    return ctx.db.query.board({ where }, info);
  },

  async list(parent, { where }, ctx, info) {
    await getUserId(ctx);
    return ctx.db.query.list({ where }, info);
  },

  async me(parent, args, ctx, info) {
    try {
      const id = await getUserId(ctx);
      const fetchedUser = await ctx.db.query.user(
        { where: { id } },
        info
      );
      return fetchedUser;
    } catch (err) {
      error('query me', err);
      throw new Error(
        'Error fetching current user details (me)',
        err
      );
    }
  },
};

module.exports = { Query };
