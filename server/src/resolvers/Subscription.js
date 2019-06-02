const {
  verifyAuth0HeaderToken,
} = require('../../src/utils');

const Subscription = {
  board: {
    subscribe: async (parent, args, ctx, info) => {
      // check User Auth Token
      await verifyAuth0HeaderToken(ctx);
      return ctx.db.subscription.board(args, info);
    },
  },
  list: {
    subscribe: async (parent, args, ctx, info) => {
      // check User Auth Token
      await verifyAuth0HeaderToken(ctx);
      return ctx.db.subscription.list(args, info);
    },
  },
  card: {
    subscribe: async (parent, args, ctx, info) => {
      // check User Auth Token
      await verifyAuth0HeaderToken(ctx);
      return ctx.db.subscription.card(args, info);
    },
  },
  user: {
    subscribe: async (parent, args, ctx, info) => {
      // check User Auth Token
      await verifyAuth0HeaderToken(ctx);
      return ctx.db.subscription.user(args, info);
    },
  },
};

module.exports = { Subscription };
