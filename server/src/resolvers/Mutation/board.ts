import { getUserId, verifyUserIsAuthenticated } from '../utils';
import { Ctxt } from '../Context';

const board = {
  async updateBoard(_parent: any, args: any, ctx: Ctxt) {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;

    const { deleteMany, create } = args.data.lists ?? {};

    let lists;
    if (deleteMany) {
      const { id_in } = deleteMany;
      lists = {
        deleteMany: {
          id: {
            in: id_in,
          },
        },
      };
    } else if (args.data.lists?.delete?.[0]) {
      lists = {
        delete: {
          id: args.data.lists?.delete[0].id,
        },
      };
    } else if (create?.[0]) {
      lists = {
        create: {
          name: create[0].name,
          createdById: userId,
        },
      };
    }

    try {
      return await prisma.board.update({
        where: args.where,
        data: {
          lists,
        },
        include: {
          createdBy: true,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async createBoard(_parent: any, args: any, ctx: Ctxt) {
    const { name } = args;
    const { prisma } = ctx;
    const id = await getUserId(ctx);
    await prisma.board.create({
      data: {
        name,
        createdBy: {
          connect: {
            id,
          },
        },
      },
    });
    return prisma.user.findUnique({
      where: { id },
      include: { boards: true },
    });
  },
  async deleteBoard(_parent: any, args: any, ctx: Ctxt) {
    const { id } = args;
    const { prisma } = ctx;

    await verifyUserIsAuthenticated(ctx);

    return prisma.board.delete({
      where: { id },
    });
  },
};

export default board;
