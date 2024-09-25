import type { User, Board, List, Card } from '@prisma/client';
import Query from './Query';

import board from './Mutation/board';
import list from './Mutation/list';
import card from './Mutation/card';

import type { Ctxt } from './Context';

export default {
  Query,
  Mutation: {
    ...board,
    ...list,
    ...card,
  },
  User: {
    async boards(parent: User, _args: any, ctx: Ctxt): Promise<Board[]> {
      const { prisma } = ctx;
      return await prisma.board.findMany({
        orderBy: {
          createdAt: 'asc',
        },
        where: { createdById: parent.id },
      });
    },
  },
  Board: {
    async lists(parent: Board, _args: any, ctx: Ctxt): Promise<List[]> {
      const { prisma } = ctx;
      return await prisma.list.findMany({
        orderBy: {
          createdAt: 'asc',
        },
        where: { board: { id: parent.id } },
        include: {
          createdBy: true,
        },
      });
    },
  },
  List: {
    async cards(parent: List, _args: any, ctx: Ctxt): Promise<Card[]> {
      const { prisma } = ctx;
      return await prisma.card.findMany({
        orderBy: {
          createdAt: 'asc',
        },
        where: { list: { id: parent.id } },
        include: {
          createdBy: true,
        },
      });
    },
  },
};
