import { verifyUserIsAuthenticated } from './utils';

const Subscription = {
  board: {
    subscribe: async (parent, args, ctx, info) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      return prisma.$subscribe.board(args);
    },
  },
  list: {
    subscribe: async (parent, args, ctx, info) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      return prisma.$subscribe.list(args);
    },
  },
  card: {
    subscribe: async (parent, args, ctx, info) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      return prisma.$subscribe.card(args);
    },
  },
  user: {
    subscribe: async (parent, args, ctx, info) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      return prisma.$subscribe.user(args);
    },
  },
};

export default Subscription;
