import { Card } from '@prisma/client';
import { getUserId } from '../../helpers/auth';
import { Ctxt } from '../Context';

export default {
  async updateCard(
    _parent: any,
    {
      where,
      data,
    }: {
      where: { id: string };
      data: {
        name: string;
        description: string | null;
      };
    },
    ctx: Ctxt
  ): Promise<Card> {
    const userId = await getUserId(ctx);

    const { name, description } = data;
    const { prisma } = ctx;

    return await prisma.card.update({
      data: {
        name,
        description,
        updatedBy: { connect: { id: userId } },
      },
      where,
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

  async moveCard(
    _parent: any,
    {
      id,
      fromListId,
      toListId,
    }: {
      id: string;
      fromListId: string;
      toListId: string;
    },
    ctx: Ctxt
  ): Promise<Card> {
    const userId = await getUserId(ctx);

    const { prisma } = ctx;

    console.log({ fromListId, toListId });

    return await prisma.card.update({
      data: {
        updatedBy: { connect: { id: userId } },
        list: {
          // disconnect: { id: fromListId },
          connect: { id: toListId },
        },
      },
      where: {
        id,
      },
    });
  },
};
