import Query from './Query';
// import Subscription from './Subscription';
import board from './Mutation/board';
import list from './Mutation/list';
import card from './Mutation/card';

export default {
  Query,
  Mutation: {
    ...board,
    ...list,
    ...card,
  },
  //Subscription,
  User: {
    async boards(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.board.findMany({
        where: { createdById: parent.id },
      });
    },
  },
  Board: {
    async lists(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.list.findMany({
        where: { board: {id: parent.id} },
        include: {
          createdBy: true
        }
      });
    },
  },
  List: {
    async cards(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.card.findMany({
          where: { list: {id: parent.id} },
          include: {
            createdBy: true
          }
        },
      );
    },
  },
};
