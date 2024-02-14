import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export interface Ctxt {
  req: NextRequest;
  prisma: PrismaClient;
}
