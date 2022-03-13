import { verifyUserIsAuthenticated } from './utils';
import { Ctxt } from './Context';

const Subscription = {
  board: {
    subscribe: async (_parent: any, args: any, ctx: Ctxt, info: any) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      // @ts-ignore subscription support not used anymore, needs full rework
      return prisma.$subscribe.board(args);
    },
  },
  list: {
    subscribe: async (_parent: any, args: any, ctx: Ctxt, info: any) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      // @ts-ignore subscription support not used anymore, needs full rework
      return prisma.$subscribe.list(args);
    },
  },
  card: {
    subscribe: async (_parent: any, args: any, ctx: Ctxt, info: any) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      // @ts-ignore subscription support not used anymore, needs full rework
      return prisma.$subscribe.card(args);
    },
  },
  user: {
    subscribe: async (_parent: any, args: any, ctx: Ctxt, info: any) => {
      await verifyUserIsAuthenticated(ctx);
      const { prisma } = ctx;
      // @ts-ignore subscription support not used anymore, needs full rework
      return prisma.$subscribe.user(args);
    },
  },
};

export default Subscription;
