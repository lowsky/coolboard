//LATER import instana from '@instana/aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import resolvers from '../../../server/src/resolvers/resolvers';
import { typeDefs } from '../../../server/src/schema/apiSchema';

import { isLocalDev } from '../../../server/src/helpers/logging';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: isLocalDev
    ? ['query', 'info', `warn`, `error`]
    : ['info', 'warn', 'error'],
});

const unmonitoredHandler = (event, context, callback) => {
  const lambdaServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: '/api/graphql',
      }),
    ],
    // If you'd like to have GraphQL Playground and introspection enabled in production,
    // install the Playground plugin and set the `introspection` option explicitly to `true`.
    introspection: true,

    context: ({ express: { req, res } }) => {
      return {
        req,
        res,
        prisma,
      };
    },
  });

  const handler = lambdaServer.createHandler();

  try {
    const result = handler(
      {
        ...event,
        // Workaround for apollo-lambda crashes when running with netlify dev
        // "Unable to determine event source based on event." (in @vendia/serverless-express)
        requestContext: {},
      },
      context,
      callback
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'GraphQL server: sorry, an error: ' + e,
      }),
    };
  } finally {
    // avoid db pool limit hit
    prisma.$disconnect();
  }
};

const handler = unmonitoredHandler;
/*
const handler = instana.wrap(
  {
    serviceName: 'github-graphql',
  },
  unmonitoredHandler
);

 */

export { handler };
