import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next';

export interface Ctxt {
  req: NextApiRequest;
  prisma: PrismaClient;
}
