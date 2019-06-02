const { getUserId } = require('../../utils');

const board = {
  async updateBoard(parent, args, ctx, info) {
    const userId = await getUserId(ctx);
    return ctx.db.mutation.updateBoard(
      {
        where: args.where,
        data: {
          ...args.data,
          updatedBy: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async createBoard(parent, args, ctx, info) {
    const { name } = args;

    const id = await getUserId(ctx);

    return ctx.db.mutation.updateUser(
      {
        data: {
          boards: {
            create: {
              name,
            },
          },
        },
        where: { id },
      },
      info
    );
  },
  async deleteBoard(parent, args, ctx, info) {
    const { id } = args;

    await getUserId(ctx);

    return ctx.db.mutation.deleteBoard(
      {
        where: { id },
      },
      info
    );
  },
};

module.exports = { board };
