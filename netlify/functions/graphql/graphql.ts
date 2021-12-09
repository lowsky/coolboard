import instana from '@instana/aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';

import resolvers from '../../../server/src/resolvers/resolvers';
import { typeDefs } from '../../../server/src/schema/apiSchema';

import { isLocalDev } from '../../../server/src/helpers/logging';
import {Handler as NetlifyFunctionHandler} from "@netlify/functions";

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: isLocalDev ? ['query', 'info', `warn`, `error`]:
    ['info', 'warn', 'error']
});

const unmonitoredHandler: NetlifyFunctionHandler = (event, context, callback) => {
  const lambdaServer = new ApolloServer({
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
    const result = handler({
      ...event,
      // Workaround for apollo-lambda crashes when running with netlify dev
      // "Unable to determine event source based on event." (in @vendia/serverless-express)
      requestContext: {}
      },
      // @ts-expect-error TS2345: identity: missing the following properties from type 'CognitoIdentity': cognitoIdentityId, cognitoIdentityPoolId
      context,
      callback
    );

    if (result) {
      return result.then((data) => {
        // avoid db pool limit hit
        prisma.$disconnect();
        return data;
      });
    }

    return result;
  }
  catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "GraphQL server: sorry, an error: " + e }),
    };
  }
}

const handler = instana.wrap(
  {
    serviceName: 'github-graphql',
  },
  unmonitoredHandler
);

export { handler };
