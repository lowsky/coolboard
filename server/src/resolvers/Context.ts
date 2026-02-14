import type { PrismaClient } from 'server/src/schema/generated/prisma/client';
import type { NextApiRequest } from 'next';

export interface Ctxt {
  req: NextApiRequest;
  prisma: PrismaClient;
}
