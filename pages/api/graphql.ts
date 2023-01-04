import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { getAuth } from '@clerk/nextjs/server';

import { isLocalDev } from '../../server/src/helpers/logging';
import { Ctxt } from '../../server/src/resolvers/Context';

import { buildSchema, prisma } from '../../server/src/buildSchema';

const getGraphqlServer = async () => {
  const apolloServer = new ApolloServer({
    schema: buildSchema(),

    introspection: Boolean(isLocalDev),

    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: '/api/graphql',
      }),
    ],
    context: ({ req, res }): Ctxt => {
      return {
        req,
        res,
        prisma,
      };
    },
  });

  await apolloServer.start();

  server = apolloServer;

  return apolloServer;
};
//LATER: exports.handler = instana.wrap((event, context, callback) => {

/*
const handler = instana.wrap((event, context, callback) => {
  const callbackFilter = function (error, output) {
    if (error) {
      console.error('error:', error);
    } else {
      isLocalDev &&
      console.info(
        'no error. -----------------------------------------------------------------------'
      );
    }

    isLocalDev &&
    console.log(
      'Environment: ',
      process && process.env && process.env.NODE_ENV
    );
    isLocalDev &&
      console.log('Environment: LOCAL DEV mode');

    isLocalDev && console.log('result', output);
    callback(error, output);
    isLocalDev && console.info('done');
  };

  const handler = lambda.createHandler();
  isLocalDev && console.info('handler created');

  return handler(event, context, callbackFilter);
});
*/

// will be stored here for re-use
let server: ApolloServer | null = null;

// eslint-disable-next-line import/no-anonymous-default-export
async function handleGraphqlRequest(req, res) {
  const apolloServer = server || (await getGraphqlServer());

  const handler = apolloServer.createHandler({
    path: '/api/graphql',
  });

  await handler(req, res);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // do not check authentication when using graphql API locally
  if(isLocalDev) {
    return handleGraphqlRequest(req, res);
  }

  const { userId } = getAuth(req);
  if (userId) {
    return handleGraphqlRequest(req, res);
  }

  isLocalDev && console.error('    userId is not yet set!');

  res.status(401).json({ id: null });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
