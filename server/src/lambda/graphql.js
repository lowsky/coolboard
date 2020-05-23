import { ApolloServer } from 'apollo-server-lambda';

import resolvers from '../resolvers';

import { typeDefs } from '../apiSchema';

import { formatError } from 'apollo-errors';
import { isLocalDev } from '../helpers/logging';
import { Prisma } from "../generated/prisma/index.js";

export const prisma = new Prisma({
  debug: true,
});
  // the Prisma DB schema
  typeDefs: generated_prisma_schema, // 'src/generated/prisma.graphql',
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  // log all GraphQL queries & mutations
  debug: isLocalDev,
});

const lambda = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,

  debug: isLocalDev,
  playground: isLocalDev,
  introspection: isLocalDev,

  engine: {
    // The Graph Manager API key
    apiKey: process.env.ENGINE_API_KEY,

    // For more information on schema tags/variants, see
    // https://www.apollographql.com/docs/platform/schema-registry/#associating-metrics-with-a-variant
    schemaTag: process.env.ENGINE_SCHEMA_TAG || 'undefined',
  },

  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },

  context: req => ({
    ...req,
    prisma,
  }),
});

exports.handler = (event, context, callback) => {
  const callbackFilter = function(error, output) {
    if (error) console.error(error);
    else {
      isLocalDev && console.info('no error. -----------------------------------------------------------------------');
    }

    console.log('Environment: ', process && process.env && process.env.NODE_ENV);
    isLocalDev && console.log('Environment: LOCAL? ', isLocalDev);

    isLocalDev && console.log('result', output);
    callback(error, output);
    isLocalDev && console.info('done');
  };

  const handler = lambda.createHandler();
  isLocalDev && console.info('handler created');

  return handler(event, context, callbackFilter);
};
