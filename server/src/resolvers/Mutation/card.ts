import { getUserId } from '../utils';

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
  async updateCard(parent, { where, data }, ctx) {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;

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

    const updatedCard = await prisma.card.update(argsWithUpdatedByUser);

    return prisma.card.findUnique({
      where: { id: updatedCard.id },
    });

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

export default card;
