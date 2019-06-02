const {
  GraphQLServerLambda,
} = require('graphql-yoga');

var debug = require('debug');
var log = debug('graphqlambda:log');

const { Prisma } = require('prisma-binding');
const resolvers = require('../resolvers');

const schema = require('../newschema.graphql');
const typeDefs = schema.typedefs;
const generated_prisma_schema =
  schema.generated_prisma_schema;

function getPrisma() {
  return new Prisma({
    // the Prisma DB schema
    typeDefs: generated_prisma_schema, // 'src/generated/prisma.graphql',
    // the endpoint of the Prisma DB service (value is set in .env)
    endpoint: process.env.PRISMA_ENDPOINT,
    // taken from database/prisma.yml (value is set in .env)
    secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
    // log all GraphQL queries & mutations
    debug: false,
  });
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,

  context: function(req) {
    log('-------------------------');
    log('            setup context');
    log('-------------------------');

    if (req.event) {
      log(
        'context(): req - event ...:',
        Object.keys(req.event)
      );
    }

    if (req.context) {
      log(
        'context(): req - context ...:',
        Object.keys(req.context)
      );
    }
    log('-------------------------');

    return {
      ...req.context,
      event: req.event,
      db: getPrisma(),
      DUMMY: 'ENTRY',
    };
  },
  debug: true,
});

function preflight(callback) {
  callback(null, {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
      'Access-Control-Allow-Headers':
        'authorization,content-type',
    },
    body: {},
  });
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    preflight(callback);
    return;
  }

  const callbackFilter = function(error, output) {
    callback(error, output);
  };
  const handler = lambda.graphqlHandler;

  return handler(event, context, callbackFilter);
};
