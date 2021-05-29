import { auth0idFromUserToken, getUserId, verifyAuth0HeaderToken, verifyUserIsAuthenticated } from './utils';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';

const Query = {
  async board(parent, { where }, ctx) {
    if (process.env.OPTIMIZED === 'false') {
      await getUserId(ctx);
    } else {
      await verifyUserIsAuthenticated(ctx);
    }
    const { prisma } = ctx;

    return prisma.board.findUnique({ where: { id: where.id }});
  },

  async list(parent, { where }, ctx) {
    if (process.env.OPTIMIZED === 'false') {
      await getUserId(ctx);
    } else {
      await verifyUserIsAuthenticated(ctx);
    }
    const { prisma } = ctx;
    return prisma.list.findUnique({ where });
  },

  me: async function(parent, args, ctx) {
    const { prisma } = ctx;
    if (false && process.env.OPTIMIZED === 'false') {
      const userId = await getUserId(ctx);
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    const userToken = await verifyAuth0HeaderToken(ctx);
    const auth0id = auth0idFromUserToken(userToken);

    const user = await prisma.user.findFirst({
      where: { auth0id },
      include: {boards: true}
    });

    if (user) {
      if (user?.id) {
        injectUserIdByAuth0id(user.id, auth0id);
      }
      return user;
    }

    const u = await createNewUser(
      userToken,
      prisma.user.create
    );

    if (isLocalDev) log('created prisma user:', u);

    if (u && u.id) {
      injectUserIdByAuth0id(u.id, auth0id);
    }
    return u;
  },
};

export default Query;
