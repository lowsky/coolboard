import { ApolloServer } from 'apollo-server-micro';

import resolvers from '../../server/src/resolvers/resolvers';
import { typeDefs } from '../../server/src/schema/apiSchema';

import { isLocalDev } from '../../server/src/helpers/logging';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: isLocalDev
    ? ['query', 'info', `warn`, `error`]
    : ['info', 'warn', 'error'],
});

const getGraphqlServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    debug: isLocalDev,
    // playground: isLocalDev,
    introspection: isLocalDev,

    /*
  engine: {
    // The Graph Manager API key
    apiKey: process.env.ENGINE_API_KEY,

    // For more information on schema tags/variants, see
    // https://www.apollographql.com/docs/platform/schema-registry/#associating-metrics-with-a-variant
    schemaTag: process.env.ENGINE_SCHEMA_TAG || 'undefined',
  },
   */

    /*
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  */
    context: ({ req, res }) => {
      return {
        req,
        res,
        prisma,
      };
    },
  });

  await apolloServer.start();
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
export default async (req, res) => {
  const apolloServer = server || (await getGraphqlServer());
  server = apolloServer;

  const handler = apolloServer.createHandler({
    path: '/api/graphql',
  });

  await handler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
