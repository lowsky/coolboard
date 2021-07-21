import { ApolloServer } from 'apollo-server-micro';

import resolvers from '../../server/src/resolvers/resolvers';
import { typeDefs } from '../../server/src/schema/apiSchema';

import { isLocalDev } from '../../server/src/helpers/logging';

// const instana = require('@instana/aws-lambda');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: isLocalDev ? ['query', 'info', `warn`, `error`]:
    ['info', 'warn', 'error']
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: isLocalDev,
  playground: isLocalDev,
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
  context: ({req}) => ({
    event: {
      headers: req.headers
    },
    prisma,
  }),
});


/*
const handler = instana.wrap((event, context, callback) => {
  const callbackFilter = function (error, output) {
    if (error) {
      console.error(error);
    } else {
      isLocalDev &&
      console.info(
        'no error. -----------------------------------------------------------------------'
      );
    }

    console.log(
      'Environment: ',
      process && process.env && process.env.NODE_ENV
    );
    isLocalDev &&
    console.log('Environment: LOCAL? ', isLocalDev);

    isLocalDev && console.log('result', output);
    callback(error, output);
    isLocalDev && console.info('done');
  };

  const handler = lambda.createHandler();
  isLocalDev && console.info('handler created');

  return handler(event, context, callbackFilter);
});
*/

const handler = server.createHandler({
  path: '/api/graphql',
});

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  /*
if (req.method === 'OPTIONS') {
  res.end()
  return false
}
   */
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }

  return handler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
}
