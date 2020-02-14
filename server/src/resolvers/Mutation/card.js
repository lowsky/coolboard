const { getUserId } = require('../utils');

const card = {
  /*
  mutation updateCard(data: CardUpdateInput!, where: CardWhereUniqueInput!): Card

  input CardUpdateInput {
    name: String
    description: String
    updatedBy: UserUpdateOneInput
  }
  input UserUpdateOneInput {
    connect: UserWhereUniqueInput
    # ...
  }
  */
  async updateCard(parent, { where, data }, ctx, info) {
    const userId = await getUserId(ctx);

    const argsWithUpdatedByUser = {
      where,
      data: {
        ...data,
        updatedBy: {
          connect: {
            id: userId,
          },
        },
      },
    };

    const updatedCard = await ctx.db.mutation.updateCard(
      argsWithUpdatedByUser
    );

    return ctx.db.query.card(
      { where: { id: updatedCard.id } },
      info
    );

    /* Example:
    mutation {
      updateCard(
        data: {
          name: "Video 5.1",
          updatedBy: {
            connect: {
              id: "cjfbofu49003q0938r41q67vb"
            }
          }
        }
        where: {
          id: "cjfejkdzn001d09459bzzsyml"
        }
      )
      {
        name
        updatedBy {
          avatarUrl
          name
        }
      }
    }
    */
  },
};

module.exports = { card };
