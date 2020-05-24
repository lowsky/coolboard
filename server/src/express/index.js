// import instana from '@instana/collector';
if(false) {
  // eslint-disable-next-line no-undef
  instana({
    tracing: {
      enabled: true,
    },
  });
}
import dotenv from 'dotenv';
dotenv.config()

import { GraphQLServer } from 'graphql-yoga';
import ApolloEngine from 'apollo-engine';
import { Prisma } from '../generated/prisma';

import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from '../apiSchema';
import resolvers from '../resolvers';

import { checkJwt } from './middleware/jwt';

const db = new Prisma({
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  // log all GraphQL queries & mutations
  debug: true,
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
  (req, res, next) => {console.info('snip 8< ------------------------------------------------'); next()},
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      console.error('JWT token verification check/auth failed!', err);
      return res.status(401).json({ err });
    }
    next();
  }
);

const httpServer = server.createHttpServer({
  // Apollo-server-based tracing:
  // This extends graphql response, and send extra detailed timing info,
  // with overhead, so I disabled it here:
  // tracing: true,
  debug: true,
});

const port = 4000;
if (process.env.ENGINE_API_KEY) {
  const engine = new ApolloEngine.ApolloEngine();

  engine.listen({ port, httpServer }, () =>
    console.log(
      `Server with Apollo Engine is running on http://localhost:${port}`
    )
  );
} else {
  httpServer.listen({ port }, () =>
    console.log(
      `Server with GraphQL server is running on http://localhost:${port}`
    )
  );
}
