import type { Board, List, User } from '@prisma/client';

import {
  verifyAndRetrieveAuthSubject,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from '../helpers/auth';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';
import type { Ctxt } from './Context';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ping(_parent: any, _args: any, _ctx: Ctxt): Promise<string> {
    return 'pong';
  },

  async board(_parent: any, { where }: any, ctx: Ctxt): Promise<Board | null> {
    // Enable loading dhe demo board even without authentication
    if (where?.id !== process.env.NEXT_PUBLIC_DEMOBOARD_ID)
      await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);

    const { prisma } = ctx;

    return await prisma.board.findUnique({
      where: { id: where.id },
    });
  },

  async list(_parent: any, { where }: any, ctx: Ctxt): Promise<List | null> {
    const { prisma } = ctx;
    return await prisma.list.findUnique({ where });
  },

  me: async (_parent: any, _args: any, ctx: Ctxt): Promise<User | null> => {
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

    // User signed in, but not created in DB yet:
    const newUser = await createNewUser(userToken, (data) =>
      prisma.user.create(data)
    );

    if (isLocalDev) console.log('created prisma user:', newUser);

    if (newUser?.id) {
      injectUserIdByAuth0id(newUser.id, auth0id);
    }
    return newUser;
  },
};
