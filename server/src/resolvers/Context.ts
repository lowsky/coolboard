import type { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';

export interface Ctxt {
  req: NextRequest;
  prisma: PrismaClient;
}
