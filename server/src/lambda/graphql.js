const { GraphQLServerLambda } = require('graphql-yoga');

const { Prisma } = require('prisma-binding');
const resolvers = require('../resolvers');

function getPrisma() {
    if(true)
    return new Prisma({
      // the Prisma DB schema
      typeDefs: 'src/generated/prisma.graphql',
      // the endpoint of the Prisma DB service (value is set in .env)
      endpoint: process.env.PRISMA_ENDPOINT,
      // taken from database/prisma.yml (value is set in .env)
      secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
      // log all GraphQL queries & mutations
      debug: true,
    });

  return new Prisma({
    // the Prisma DB schema
    typeDefs: 'src/generated/prisma.graphql',
    // the endpoint of the Prisma DB service (value is set in .env)

    // PRISMA_STAGE="dev"
    // PRISMA_ENDPOINT="http://localhost:4466/coolboardsecure/dev"
    // PRISMA_CLUSTER="local"
    // PRISMA_SECRET="mysecret123"
    // APP_SECRET="jwtsecret123"

    endpoint: 'http://localhost:4466/coolboardsecure/dev', //process.env.PRISMA_ENDPOINT,
    // taken from database/prisma.yml (value is set in .env)
    secret: 'mysecret123', //process.env.PRISMA_SECRET,
    // log all GraphQL queries & mutations
    debug: true,
  });
}

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`;

const helloResolvers = {
  Query: {
    hello: async function(_, { name }, ctx) {
      console.log("hello: ctx = ", Object.keys(ctx), ctx);
      console.log("hello: ctx  ", Object.keys(ctx.event), ctx.event);

      return `Hello ${name || 'world'}`;
    },
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs: './src/schema.graphql',
  resolvers, // : helloResolvers,

  context: function(req) {

    return {

      ...req.context,
      event: req.event,
      db: getPrisma(),
        DUMMY: "ENTRY"
    };
  },
});

exports.handler = lambda.handler;

/*
const { GraphQLServerLambda } = require('graphql-yoga');
const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

exports.handler = lambda.handler;
*/
