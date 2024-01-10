import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { getAuth } from '@clerk/nextjs/server';

import { isLocalDev } from '../../server/src/helpers/logging';
import { Ctxt } from '../../server/src/resolvers/Context';

import { buildSchema, prisma } from '../../server/src/buildSchema';
import { PrismaClient } from '@prisma/client';

const getGraphqlServer = async () => {
  return new ApolloServer<Ctxt>({
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
};

// will be stored for re-use
let server: ApolloServer<Ctxt> | null = null;

// eslint-disable-next-line import/no-anonymous-default-export
async function handleGraphqlRequest(req: NextApiRequest, res: NextApiResponse) {
  const apolloServer = server ?? (await getGraphqlServer());

  const options: {
    context: ContextFunction<[NextApiRequest], Ctxt>;
  } = {
    context: async (req: NextApiRequest) => {
      return {
        req,
        prisma: prisma as unknown as PrismaClient,
      };
    },
  };
  const graphqlHandler = startServerAndCreateNextHandler<NextApiRequest, Ctxt>(
    apolloServer,
    options
  );

  return await graphqlHandler(req, res);
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // don't check authentication when using graphql API locally
  // just for easier debugging/testing the gql schema ...
  if (isLocalDev) {
    return await handleGraphqlRequest(req, res);
  }

  try {
    const { userId } = getAuth(req);
    if (userId) {
      return await handleGraphqlRequest(req, res);
    }
  } catch (e) {
    console.error(e);
  }

  isLocalDev && console.error('    userId is not yet set!');

  res.status(401).json({ id: null });
};

export default handler;

export const config = {
  api: {
    bodyParser: true,
  },
};
