import { List } from '@prisma/client';
import {
  getUserId,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from '../../helpers/auth';
import { Ctxt } from '../Context';

const list = {
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

    let cards = {};
    if (create?.[0]) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'create' does not exist on type '{}'.
      cards.create = {
        name: create[0].name,
        createdById: userId,
        updatedById: userId,
      };
    }
    if (connect?.[0]) {
      const id = connect[0].id;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'connect' does not exist on type '{}'.
      cards.connect = {
        id,
      };
    }
    if (disconnect?.[0]) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'disconnect' does not exist on type '{}'.
      cards.disconnect = {
        id: disconnect[0].id,
      };
    }
    return prisma.list.update({
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
  async deleteList(_parent: any, { where }: any, ctx: Ctxt): Promise<List> {
    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);
    const { prisma } = ctx;
    return prisma.list.delete({ where });
  },
};

export default list;
