const { getUserId } = require('../utils');
const { verifyUserIsAuthenticated } = require('../utils');

const list = {
  async updateList(parent, args, ctx, info) {
    const userId = await getUserId(ctx);

    return ctx.db.mutation.updateList({
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
  async deleteList(parent, args, ctx, info) {
    await verifyUserIsAuthenticated(ctx);
    return ctx.db.mutation.deleteList(args, info);
  },
};

module.exports = { list };
