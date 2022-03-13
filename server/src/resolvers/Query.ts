import {
  getUserId,
  verifyAndRetrieveAuth0HeaderToken,
  verifyAuth0HeaderToken,
  verifyUserIsAuthenticated,
} from './utils';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';
import { Ctxt } from './Context';

const Query = {
  async board(_parent: any, { where }: any, ctx: Ctxt) {
    if (process.env.OPTIMIZED === 'false') {
      await getUserId(ctx);
    } else {
      await verifyUserIsAuthenticated(ctx);
    }
    const { prisma } = ctx;

    return prisma.board.findUnique({ where: { id: where.id } });
  },

  async list(_parent: any, { where }: any, ctx: Ctxt) {
    if (process.env.OPTIMIZED === 'false') {
      await getUserId(ctx);
    } else {
      await verifyUserIsAuthenticated(ctx);
    }
    const { prisma } = ctx;
    return prisma.list.findUnique({ where });
  },

  me: async function (_parent: any, _args: any, ctx: Ctxt) {
    const { prisma } = ctx;
    if (false && process.env.OPTIMIZED === 'false') {
      const userId = await getUserId(ctx);
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    const auth0id = await verifyAndRetrieveAuth0HeaderToken(ctx);
    const user = await prisma.user.findFirst({
      where: { auth0id },
    });

    if (user) {
      if (user?.id) {
        injectUserIdByAuth0id(user.id, auth0id);
      }
      return user;
    }
    const userToken = await verifyAuth0HeaderToken(ctx);

    // user signed in, but not created in DB yet:
    const u = await createNewUser(userToken, (data) =>
      // @ts-expect-error needs small adaption
      prisma.user.create({ data })
    );

    if (isLocalDev) console.log('created prisma user:', u);

    if (u && u.id) {
      injectUserIdByAuth0id(u.id, auth0id);
    }
    return u;
  },
};

export default Query;
