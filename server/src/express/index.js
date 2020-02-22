require('@instana/collector')({
  tracing: {
    enabled: true,
  },
});

require('dotenv/config');

const { GraphQLServer } = require('graphql-yoga');
const { ApolloEngine } = require('apollo-engine');
const { Prisma } = require('prisma-binding');

const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('../apiSchema.js');
const resolvers = require('../resolvers');

const { checkJwt } = require('./middleware/jwt');
const { getUser } = require('./middleware/getUser');

const db = new Prisma({
  // the Prisma DB schema
  typeDefs: 'src/generated/prisma.graphql',
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  // log all GraphQL queries & mutations
  debug: true,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new GraphQLServer({
  schema,
  debug: true,
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
      console.error('JWT check/auth failed ?! -> 401', err);
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
  apiKey: process.env.ENGINE_API_KEY,
});

const httpServer = server.createHttpServer({
  tracing: false, // Apollo-tracing off?
  cacheControl: true,
});

const port = 4000;

engine.listen(
  {
    port,
    httpServer,
    graphqlPaths: ['/'],
  },
  () =>
    console.log(
      `Server with Apollo Engine is running on http://localhost:${port}`
    )
);
