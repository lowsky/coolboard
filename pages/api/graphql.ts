import { startTracing } from '../../server/initTracing';

import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { getAuth } from '@clerk/nextjs/server';

import { isLocalDev } from '../../server/src/helpers/logging';
import { Ctxt } from '../../server/src/resolvers/Context';

import { buildSchema, prisma } from '../../server/src/buildSchema';

const getGraphqlServer = async () => {
  const apolloServer = new ApolloServer<Ctxt>({
    schema: buildSchema(),

    introspection: Boolean(isLocalDev),

    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: '/api/graphql',
      }),
    ],
  });

  return apolloServer;
};

// will be stored for re-use
let server: ApolloServer<Ctxt> | null = null;

// eslint-disable-next-line import/no-anonymous-default-export
async function handleGraphqlRequest(req, res) {
  const apolloServer = server || (await getGraphqlServer());

  const graphqlHandler = startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => {
      return {
        req,
        res,
        prisma,
      };
    },
  });

  return await graphqlHandler(req, res);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startTracing();

  // do not check authentication when using graphql API locally
  // just for easier debugging/testing the gql schema ...
  if (isLocalDev) {
    return await handleGraphqlRequest(req, res);
  }

  const { userId } = getAuth(req);
  if (userId) {
    return await handleGraphqlRequest(req, res);
  }

  isLocalDev && console.error('    userId is not yet set!');

  res.status(401).json({ id: null });
}

export const config = {
  api: {
    bodyParser: true,
  },
};
