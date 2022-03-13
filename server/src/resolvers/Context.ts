import { PrismaClient } from '@prisma/client';

export interface Ctxt {
  req: any;
  res: any;
  prisma: PrismaClient;
}
