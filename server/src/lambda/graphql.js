const { GraphQLServerLambda } = require('graphql-yoga');

const { Prisma } = require('prisma-binding');
const resolvers = require('../resolvers');

const schema = require('../newschema.graphql');
const typeDefs = schema.typedefs;
const gernerated_prisma_schema = schema.gernerated_prisma_schema;

function getPrisma() {
  if (true) {
    return new Prisma({
      // the Prisma DB schema
      typeDefs: gernerated_prisma_schema, // 'src/generated/prisma.graphql',
      // the endpoint of the Prisma DB service (value is set in .env)
      endpoint: process.env.PRISMA_ENDPOINT,
      // taken from database/prisma.yml (value is set in .env)
      secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
      // log all GraphQL queries & mutations
      debug: true,
    });
  }

  return new Prisma({
    // the Prisma DB schema
    typeDefs: 'src/generated/prisma.graphql',
    // the endpoint of the Prisma DB service (value is set in .env)

    // PRISMA_STAGE="dev"
    // PRISMA_ENDPOINT="http://localhost:4466/coolboardsecure/dev"
    // PRISMA_CLUSTER="local"
    // PRISMA_SECRET="mysecret123"
    // APP_SECRET="jwtsecret123"

    endpoint:
      'http://localhost:4466/coolboardsecure/dev', //process.env.PRISMA_ENDPOINT,
    // taken from database/prisma.yml (value is set in .env)
    secret: 'mysecret123', //process.env.PRISMA_SECRET,
    // log all GraphQL queries & mutations
    debug: true,
  });
}

const typeDefsX = `
  type Query {
    hello(name: String): String
  }
`;

const helloResolvers = {
  Query: {
    hello: async function(_, { name }, ctx) {
      console.log(
        'hello: ctx = ',
        Object.keys(ctx),
        ctx
      );
      console.log(
        'hello: ctx  ',
        Object.keys(ctx.event),
        ctx.event
      );

      return `Hello ${name || 'world'}`;
    },
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers, // : helloResolvers,

  context: function(req) {
    console.log('context(): req:', Object.keys(req));
    if (req.event)
      console.log(
        'context(): req - event:',
        Object.keys(req.event)
      );
    if (req.event)
      console.log(
        'context(): req - context:',
        Object.keys(req.context)
      );

    // if(req.context) console.log('context(): req - contxt:', Object.keys(req.context), req.context );

    return {
      ...req.context,
      event: req.event,
      db: getPrisma(),
      DUMMY: 'ENTRY',
    };
  },
});

//exports.handler = lambda.handler;


var defaults = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

exports.handler = function(event, context, callback) {
  const callbackFilter = function(error, output) {
    output.headers['Access-Control-Allow-Methods'] = defaults.methods;
    output.headers['Access-Control-Allow-Headers'] = 'authorization,content-type';
    output.headers['Access-Control-Allow-Origin'] = defaults.origin;



    callback(error, output);
  };
  const handler = lambda.handler;

  return handler(event, context, callbackFilter);
};

/*
const { GraphQLServerLambda } = require('graphql-yoga');
const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

exports.handler = lambda.handler;
*/
