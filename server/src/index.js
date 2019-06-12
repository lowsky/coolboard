const { GraphQLServer } = require('graphql-yoga');
const { ApolloEngine } = require('apollo-engine');
const { Prisma } = require('prisma-binding');
const { checkJwt } = require('./express/middleware/jwt');
const {
  makeExecutableSchema,
} = require('graphql-tools');
const { importSchema } = require('graphql-import');
const { formatError } = require('apollo-errors');
const resolvers = require('./resolvers');

const { getUser } = require('./express/middleware/getUser');

const options = {
  formatError: (...args) => {
    return formatError(...args);
  },
};

const db = new Prisma({
  // the Prisma DB schema
  typeDefs: 'src/generated/prisma.graphql',
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  // log all GraphQL queries & mutations
  debug: false,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

const schema = makeExecutableSchema({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
});

const server = new GraphQLServer({
  schema,
  debug: false,
  context: req => ({
    ...req,
    db,
  }),
});

server.express.post(
  server.options.endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      return res.status(401).json({ err });
    }
    next();
  }
);
server.express.post(
  server.options.endpoint,
  (req, res, next) => getUser(req, res, next, db)
);

const engine = new ApolloEngine({
  // apiKey: process.env.APOLLO_ENGINE_KEY,
  apiKey: 'service:lowsky-coolboard:FfdCjK0Nug0Dq2_qFuLfgw',
});

const httpServer = server.createHttpServer({
  tracing: true,
  cacheControl: true,
});

const port=4000;

engine.listen(
    {
      port,
      httpServer,
      graphqlPaths: ['/'],
    },
    () =>
        console.log(
            `Server with Apollo Engine is running on http://localhost:${port}`,
        ),
);
