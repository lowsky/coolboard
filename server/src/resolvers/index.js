import Query from './Query';
import Subscription from './Subscription';
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
  Subscription,
  User: {
    boards(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.user({ id: parent.id }).boards();
    },
  },
  Board: {
    lists(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.board({ id: parent.id }).lists();
    },
  },
  List: {
    cards(parent, args, ctx) {
      const { prisma } = ctx;
      return prisma.list({ id: parent.id }).cards();
    },
  },
};
