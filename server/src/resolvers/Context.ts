import type { PrismaClient } from 'server/src/schema/generated/prisma/client';
import type { NextRequest } from 'next/server';

export interface Ctxt {
  req: NextRequest;
  prisma: PrismaClient;
}
