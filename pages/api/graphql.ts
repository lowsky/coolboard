import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

import { isLocalDev } from 'server/src/helpers/logging';
import { Ctxt } from 'server/src/resolvers/Context';
import { buildSchema, prisma } from 'server/src/buildSchema';

import { REQ_HEADER_x_coolboard_readonly } from 'src/headers';

const apolloServer = new ApolloServer<Ctxt>({
  schema: buildSchema(),
  introspection: Boolean(isLocalDev),
  allowBatchedHttpRequests: true,
  plugins: [
    ApolloServerPluginUsageReportingDisabled(),
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
    }),
  ],
});

const injectContext: ContextFunction<[NextRequest], Ctxt> = async (req) => ({
  req,
  prisma: prisma as unknown as PrismaClient,
});

const handleGraphqlRequest = startServerAndCreateNextHandler<NextRequest, Ctxt>(
  apolloServer,
  { context: injectContext }
);

const authenticatedHandler = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const readOnlyHeader = req.headers[REQ_HEADER_x_coolboard_readonly];
  const isReadOnlyHeader = readOnlyHeader === 'true';

  if (isReadOnlyHeader) {
    await handleGraphqlRequest(req, res);
    return;
  }

  try {
    const { userId } = getAuth(req);
    if (userId) {
      await handleGraphqlRequest(req, res);
      return;
    }
  } catch (e) {
    console.error(e);
  }
  isLocalDev && console.error('    userId is not yet set!');

  res.status(401).json({ id: null });
};

export default authenticatedHandler;
