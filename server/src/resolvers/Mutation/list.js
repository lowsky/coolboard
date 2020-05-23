import { getUserId, verifyUserIsAuthenticated } from '../utils';

const list = {
  async updateList(parent, args, ctx) {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;

    return prisma.updateList({
      where: args.where,
      data: {
        ...args.data,
        updatedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },
  async deleteList(parent, args, ctx) {
    await verifyUserIsAuthenticated(ctx);
    const { prisma } = ctx;
    return prisma.deleteList(args);
  },
};

export default list;
