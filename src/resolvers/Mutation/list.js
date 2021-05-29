import { getUserId, verifyUserIsAuthenticated } from '../utils';

const list = {
  async updateList(parent, { where, data }, ctx) {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;
    const { create, connect, disconnect, ...otherCardOperation } = data.cards ?? {};

    if (!create && !connect && !disconnect) {
      throw new Error('Unsupported operation on lists: ' + Object.keys(otherCardOperation));
    }

    let cards = {};
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
  async deleteList(parent, { where }, ctx) {
    await verifyUserIsAuthenticated(ctx);
    const { prisma } = ctx;
    return prisma.list.delete({ where });
  },
};

export default list;
