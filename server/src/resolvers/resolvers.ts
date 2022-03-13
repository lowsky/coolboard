import Query from './Query';

import board from './Mutation/board';
import list from './Mutation/list';
import card from './Mutation/card';
import { Ctxt } from './Context';
import { User, Board, List } from '@prisma/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Query,
  Mutation: {
    ...board,
    ...list,
    ...card,
  },
  User: {
    async boards(parent: User, _args: any, ctx: Ctxt) {
      const { prisma } = ctx;
      return prisma.board.findMany({
        orderBy: {
          createdAt: 'asc',
        },
        where: { createdById: parent.id },
      });
    },
  },
  Board: {
    async lists(parent: Board, _args: any, ctx: Ctxt) {
      const { prisma } = ctx;
      return prisma.list.findMany({
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
    async cards(parent: List, _args: any, ctx: Ctxt) {
      const { prisma } = ctx;
      return prisma.card.findMany({
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
