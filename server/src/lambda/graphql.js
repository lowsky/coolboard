const { ApolloServer } = require('apollo-server-lambda');
const { Prisma } = require('prisma-binding');

const resolvers = require('../resolvers');

const { typedefs, generated_prisma_schema } = require('../apiSchema');

const db = new Prisma({
  // the Prisma DB schema
  typeDefs: generated_prisma_schema, // 'src/generated/prisma.graphql',
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  // log all GraphQL queries & mutations
  debug: true,
});

const lambda = new ApolloServer({
  typeDefs: typedefs,
  resolvers,

  debug: true,

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
    db,
  }),
});

exports.handler = (event, context, callback) => {
  const callbackFilter = function(error, output) {
    if (error) console.error(error);
    else console.error('no errrorr');

    console.log('result', output);
    callback(error, output);
    console.error('done');
  };

  const handler = lambda.createHandler();
  console.error('handler created');

  return handler(event, context, callbackFilter);
};
