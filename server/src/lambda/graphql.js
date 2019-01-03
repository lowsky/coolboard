const { GraphQLServerLambda } = require('graphql-yoga');

const { Prisma } = require('prisma-binding');
const resolvers = require('../resolvers');

function getPrisma() {
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
    hello: function(_, { name }, ctx) {
      console.log("me:", Object.keys(ctx)  );
      if(ctx.context) console.log('me .contxt:', Object.keys(ctx.context) );

      return `Hello ${name || 'world'}`;
    },
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: function(req) {
    console.log('Creating/filling req:', Object.keys(req) );
    if(req.context) console.log('Creating/filling Req.contxt:', Object.keys(req.context) );
    if(req.event) console.log('Creating/filling Req.event:', Object.keys(req.event) );

    return {
      ...req,

      context: {
        DUMMY: "ENTRY"
      },

      // db: getPrisma(),
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
