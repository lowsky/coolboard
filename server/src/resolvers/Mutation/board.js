import { getUserId, verifyUserIsAuthenticated } from '../utils';

const board = {
  async updateBoard(parent, args, ctx, info) {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;

    return prisma.updateBoard({
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
  async createBoard(parent, args, ctx, info) {
    const { name } = args;
    const { prisma } = ctx;

    const id = await getUserId(ctx);

    return prisma.updateUser({
      data: {
        boards: {
          create: {
            name,
          },
        },
      },
      where: { id },
    });
  },
  async deleteBoard(parent, args, ctx, info) {
    const { id } = args;
    const { prisma } = ctx;

    await verifyUserIsAuthenticated(ctx);

    return prisma.deleteBoard({
      where: { id },
    });
  },
};

export default board;
