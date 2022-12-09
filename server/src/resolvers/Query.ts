import {
  verifyAndRetrieveAuthSubject,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from '../helpers/auth';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';
import { Ctxt } from './Context';

export default {
  async board(_parent: any, { where }: any, ctx: Ctxt) {
    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);

    const { prisma } = ctx;
    return prisma.board.findUnique({ where: { id: where.id } });
  },

  async list(_parent: any, { where }: any, ctx: Ctxt) {
    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);

    const { prisma } = ctx;
    return prisma.list.findUnique({ where });
  },

  me: async function (_parent: any, _args: any, ctx: Ctxt) {
    const { prisma } = ctx;

    const auth0id = await verifyAndRetrieveAuthSubject(ctx);
    const user = await prisma.user.findFirst({
      where: { auth0id },
    });

    if (user) {
      if (user!.id) {
        injectUserIdByAuth0id(user!.id, auth0id);
      }
      return user;
    }
    const userToken = await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);

    // user signed in, but not created in DB yet:
    const u = await createNewUser(userToken, (data) =>
      prisma.user.create(data)
    );

    if (isLocalDev) console.log('created prisma user:', u);

    if (u?.id) {
      injectUserIdByAuth0id(u.id, auth0id);
    }
    return u;
  },
};
