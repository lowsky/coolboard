const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { checkJwt } = require('./middleware/jwt');
const {
  makeExecutableSchema,
} = require('graphql-tools');
const { importSchema } = require('graphql-import');
const { formatError } = require('apollo-errors');
const resolvers = require('./resolvers');

const { getUser } = require('./middleware/getUser');

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
});

const schema = makeExecutableSchema({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
});

const server = new GraphQLServer({
  schema,
  context: req => ({
    ...req,
    db,
  }),
});

server.express.post(
  server.options.endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) return res.status(401).send(err.message);
    next();
  }
);
server.express.post(
  server.options.endpoint,
  (req, res, next) => getUser(req, res, next, db)
);

server.start(options, () =>
  console.log(
    'Server is running on http://localhost:4000'
  )
);
