// const resolvers = require('../resolvers');
// import { typeDefs } from '../apiSchema';

//import { isLocalDev } from '../helpers/logging';
const { ApolloServer } = require("apollo-server-lambda");
const isLocalDev = true;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: isLocalDev ? ['query', 'info', `warn`, `error`]:
    ['info', 'warn', 'error']
});

const lambda = new ApolloServer({
  typeDefs: `type Query {
    hello: String
  }`,
  resolvers: {
    Query : {
      async hello(parent, args, ctx) {
        const b = await prisma.board.findUnique({ where: { id: "ckp3ws6oa0050pla1nofdwbi1" }});
        return b.name;
      },
    },
  },

  debug: isLocalDev,
  playground: isLocalDev,
  introspection: isLocalDev,

  engine: {
    // The Graph Manager API key
    //apiKey: process.env.ENGINE_API_KEY,

    // For more information on schema tags/variants, see
    // https://www.apollographql.com/docs/platform/schema-registry/#associating-metrics-with-a-variant
    schemaTag: process.env.ENGINE_SCHEMA_TAG || 'undefined',
  },

  /*
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  */
  context: req => ({
    ...req,
    //prisma,
  }),
});

//exports.handler = instana.wrap((event, context, callback) => {
exports.handler = ((event, context, callback) => {
  const callbackFilter = function (error, output) {
    if (error) {
      console.error(error);
    } else {
      isLocalDev &&
        console.info(
          'no error. -----------------------------------------------------------------------'
        );
    }

    console.log(
      'Environment: ',
      process && process.env && process.env.NODE_ENV
    );
    isLocalDev &&
      console.log('Environment: LOCAL? ', isLocalDev);

    isLocalDev && console.log('result', output);
    callback(error, output);
    isLocalDev && console.info('done');
  };

  const handler = lambda.createHandler();
  isLocalDev && console.info('handler created');

  return handler(event, context, callbackFilter);
});
