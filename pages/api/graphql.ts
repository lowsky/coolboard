import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { withAuth } from '@clerk/nextjs/api';
import { PrismaClient } from '@prisma/client';

import resolvers from '../../server/src/resolvers/resolvers';
import { typeDefs } from '../../server/src/schema/apiSchema';

import { isLocalDev } from '../../server/src/helpers/logging';
import { Ctxt } from '../../server/src/resolvers/Context';

const prisma = new PrismaClient({
  log: isLocalDev
    ? ['query', 'info', `warn`, `error`]
    : ['info', 'warn', 'error'],
});

const getGraphqlServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,

    /*
    APOLLO_GRAPH_VARIANT
   */

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

export default withAuth(async (req, res) => {
  if (req.auth) {
    const { userId, sessionId, getToken } = req.auth;

    isLocalDev && console.log('req.auth', req.auth);
    isLocalDev &&
      console.log('req.auth', userId, sessionId, await getToken?.());

    return handleGraphqlRequest(req, res);
  } else {
    isLocalDev && console.log('no request.auth');

    res.status(401).json({ id: null });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
