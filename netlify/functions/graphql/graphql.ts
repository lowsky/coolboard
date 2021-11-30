import './open-telemetry'
import { ApolloServer } from 'apollo-server-lambda';

import resolvers from '../../../server/src/resolvers/resolvers';
import { typeDefs } from '../../../server/src/schema/apiSchema';

import { isLocalDev } from '../../../server/src/helpers/logging';

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: isLocalDev ? ['query', 'info', `warn`, `error`]:
    ['info', 'warn', 'error']
});

let handler = (event, context, callback) => {
  let lambdaServer;
  lambdaServer = new ApolloServer({
    typeDefs,
    resolvers,

    debug: isLocalDev,
    introspection: isLocalDev,

    context: ({event}) => ({
      event: {
        headers: event.headers
      },
      prisma,
    })
  });

  const handler = lambdaServer.createHandler();

  try {
    return handler({
      ...event,
      // Workaround for apollo-lambda crashes when running with netlify dev
      // "Unable to determine event source based on event." (in @vendia/serverless-express)
      requestContext: {}
    }, context, callback);
  }
  catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "GraphQL server: sorry, an error: " + e }),
    };
  }
}

export { handler };
