import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Ctxt {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}
