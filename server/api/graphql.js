import { ApolloServer } from 'apollo-server-micro';
import { formatError } from 'apollo-errors';

import resolvers from '../src/resolvers';
import { typeDefs } from '../src/apiSchema';

import { Prisma } from '../src/generated/prisma';
import { isLocalDev } from '../src/helpers/logging';

// const instana = require('@instana/aws-lambda');

export const prisma = new Prisma({
  debug: isLocalDev,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,

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

    if (req.method === 'OPTIONS') {
        return res.send(200);
    }

    return handler(req, res);
};
