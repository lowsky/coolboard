const { getUserId } = require('../utils');

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
    const id = await getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { Query };
