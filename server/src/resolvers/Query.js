const { getUserId } = require('../utils');

const Query = {
  board(parent, { id }, ctx, info) {
    console.log("board:", { id, ctx})
    getUserId(ctx);
    return ctx.db.query.board({ where: { id } }, info);
  },

  list(parent, { id }, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.list({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    console.log("me:", { ctx, req: ctx.req })
    const id = getUserId(ctx);
    console.log("me:", { id })
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { Query };
