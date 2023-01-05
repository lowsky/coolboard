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
        name?: string | null;
        description?: string | null;
      };
    },
    ctx: Ctxt
  ): Promise<Card> {
    const userId = await getUserId(ctx);

    const { name, description } = data;
    const { prisma } = ctx;

    return await prisma.card.update({
      data: {
        name: name ?? undefined,
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
};
