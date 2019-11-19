const { ApolloServer } = require('apollo-server-lambda');
const { Prisma } = require('prisma-binding');

const resolvers = require('../resolvers');

const schema = require('./newschema.graphql');
const { typedefs, generated_prisma_schema } = schema;

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
    callback(error, output);
  };
  const handler = lambda.createHandler();

  return handler(event, context, callbackFilter);
};
