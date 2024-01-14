import { Board, User, Prisma } from '@prisma/client';
import {
  getUserId,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from '../../helpers/auth';
import { Ctxt } from '../Context';

export default {
  async updateBoard(_parent: any, args: any, ctx: Ctxt): Promise<Board> {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;

    const { deleteMany, create } = args.data.lists ?? {};

    let lists: Prisma.ListUncheckedUpdateManyWithoutBoardNestedInput = {};
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

    return await prisma.board.update({
      where: args.where,
      data: {
        lists,
      },
      include: {
        createdBy: true,
      },
    });
  },
  async createBoard(
    _parent: any,
    args: any,
    ctx: Ctxt
  ): Promise<(User & { boards: Board[] }) | null> {
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
    return await prisma.user.findUnique({
      where: { id },
      include: { boards: true },
    });
  },
  async deleteBoard(
    _parent: any,
    args: { id: string },
    ctx: Ctxt
  ): Promise<Board> {
    const { id } = args;
    const { prisma } = ctx;

    await verifyUserIsAuthenticatedAndRetrieveUserToken(ctx);

    return await prisma.board.delete({
      where: { id },
    });
  },
};
