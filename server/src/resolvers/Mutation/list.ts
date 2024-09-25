import type { List, Prisma } from '@prisma/client';
import type { MutationDeleteListArgs } from 'generated/graphql';
import {
  getUserId,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from '../../helpers/auth';
import type { Ctxt } from '../Context';

export default {
  async updateList(
    _parent: any,
    { where, data }: any,
    ctx: Ctxt
  ): Promise<List> {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;
    const { create, connect, disconnect, ...otherCardOperation } =
      data.cards ?? {};

    if (!create && !connect && !disconnect) {
      throw new Error(
        'Unsupported operation on lists: ' + Object.keys(otherCardOperation)
      );
    }

    const cards: Prisma.CardUncheckedUpdateManyWithoutListNestedInput = {};
    if (create?.[0]) {
      cards.create = {
        name: create[0].name,
        createdById: userId,
        updatedById: userId,
      };
    }
    if (connect?.[0]) {
      const id = connect[0].id;
      cards.connect = {
        id,
      };
    }
    if (disconnect?.[0]) {
      cards.disconnect = {
        id: disconnect[0].id,
      };
    }

    return await prisma.list.update({
      where,
      data: {
        cards,
        // createdById: userId, // should be updated-by
        // updatedById: userId,
      },
      include: {
        createdBy: true,
      },
    });
  },
  deleteList: async (
    _parent: any,
    args: MutationDeleteListArgs,
    ctx: Ctxt
  ): Promise<List> => {
    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);
    const { prisma } = ctx;
    return prisma.list.delete({
      where: {
        id: args.id,
      },
    });
  },
};
