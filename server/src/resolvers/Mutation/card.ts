import { Card } from '@prisma/client';
import { getUserId } from '../../helpers/auth';
import { Ctxt } from '../Context';

export default {
  /*
  mutation updateCard(data: CardUpdateInput!, where: CardWhereUniqueInput!): Card
  input CardUpdateInput {
    name: String
    description: String
  }
  */
  async updateCard(
    _parent: any,
    {
      where,
      data,
    }: {
      where: { id: string };
      data: { name: string; description: string };
    },
    ctx: Ctxt
  ): Promise<Card | null> {
    const userId = await getUserId(ctx);
    const { prisma } = ctx;
    const { name, description } = data;

    const updatedCard = await prisma.card.update({
      data: { name, description, updatedBy: { connect: { id: userId } } },
      where,
    });

    return prisma.card.findUnique({
      where: { id: updatedCard.id },
    });

    /* Example:
    mutation {
      updateCard(
        data: {
          name: "Video 5.1",
          description: "Video 5.1",
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
